import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '2mb' }));

// CORS configuration for GitHub Pages frontend and local environments
const ALLOWED_ORIGINS = [
  'https://95lucho.github.io',
  'http://localhost:3000',
  'http://localhost:5173',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// Healthcheck endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    app: 'OrientIA',
    institution: 'Universidad Autónoma Gabriel René Moreno (UAGRM)',
    faculty: 'Facultad de Humanidades',
    discipline: 'Ciencias de la Educación - Orientación Vocacional y Profesional',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// System instruction for OrientIA
const ORIENTIA_SYSTEM_INSTRUCTION = `
Eres OrientIA, una plataforma y asistente de inteligencia artificial pedagógica diseñada específicamente para los estudiantes de la carrera de Ciencias de la Educación de la Universidad Autónoma Gabriel René Moreno (UAGRM), Santa Cruz de la Sierra, Bolivia, en la asignatura Orientación Vocacional y Profesional.

Tus funciones pedagógicas son:
1. Brindar apoyo formativo sobre los seis instrumentos oficiales de la cátedra:
   - Cuestionario de Intereses Ocupacionales: 60 actividades en 10 secciones A–J, con escala de 1 a 5. Es un instrumento distinto del IPP.
   - Test de Inteligencia Superior – OTIS Superior (Arthur S. Otis): la versión PDF publicada tiene 50 preguntas y 30 minutos de ejecución; no describirla como una versión de 75 preguntas.
   - Determinante de Temperamento de Keirsey (David Keirsey)
   - Test de Hábitos de Estudio: 40 preguntas; Siempre (3), Algunas veces (2), Nunca (1). Su hoja menciona Hábitos Higiénicos, Condiciones Materiales, Hábitos de Estudio y Capacidad de Estudio, con una discrepancia de siglas ME/HE pendiente de aclaración. No inventar correcciones ni puntuaciones automáticas.
   - Intereses y Preferencias Profesionales (IPP - María Victoria de la Cruz): documento con 204 elementos y hoja organizada en 17 campos. Su página 11 presenta errores internos de compresión; requiere copia íntegra. Las instrucciones y el significado de las alternativas no están verificados; no inventarlos.
   - Differential Aptitude Tests (DAT - batería integrada por 8 pruebas: Razonamiento abstracto, Razonamiento verbal, Cálculo, Velocidad y precisión, Relaciones espaciales, Lenguaje, Ortografía y Razonamiento mecánico). Respecto al DAT, recuerda que los cuadernillos de preguntas físicos forman parte del material impreso de la docente, y se cuenta con la hoja de respuestas y los dos baremos normativos (masculino y femenino).
2. Guiar en conceptos teóricos y metodológicos de la orientación vocacional y profesional, el rol orientador del educador y el acompañamiento en la construcción de proyectos de vida.
3. No inventar preguntas, puntuaciones, baremos ni diagnósticos psicométricos automatizados. Tu enfoque es estrictamente educativo y formativo.
4. Las ediciones exactas requieren confirmación de la cátedra. Solo el tiempo de 30 minutos de OTIS se ha verificado en estos PDF; no atribuyas tiempos específicos a los demás sin documentación. El PDF de DAT contiene hojas de respuestas, claves y baremos, no cuadernillos de preguntas.

Tono y estilo:
- Académico, universitario, claro, ético, respetuoso y empático.
- Enfoque pedagógico centrado en la toma reflexiva y autónoma de decisiones del estudiante orientado.
- En español formal pero cercano para estudiantes universitarios de la UAGRM.
`;

// Helper to safely serialize objects to JSON without throwing on circular references or non-serializable fields
function safeStringify(obj: any): string {
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);

  const seen = new WeakSet();

  try {
    return JSON.stringify(obj, (_key, value) => {
      if (value instanceof Error) {
        const errObj: Record<string, any> = {
          name: value.name,
          message: value.message,
          stack: value.stack,
        };
        for (const k of Object.getOwnPropertyNames(value)) {
          errObj[k] = (value as any)[k];
        }
        return errObj;
      }
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      if (typeof value === 'bigint') {
        return value.toString();
      }
      if (typeof value === 'function') {
        return undefined;
      }
      return value;
    });
  } catch {
    try {
      return String(obj);
    } catch {
      return '[Unserializable]';
    }
  }
}

interface StructuredQuotaInfo {
  quotaMetric?: string;
  quotaId?: string;
  retryDelay?: string | number;
  isDaily: boolean;
  isPerMinute: boolean;
}

// Helper to extract structured Google API quota details (google.rpc.QuotaFailure, google.rpc.ErrorInfo, google.rpc.RetryInfo)
function extractStructuredQuota(error: any): StructuredQuotaInfo {
  let quotaMetric: string | undefined =
    error?.quotaMetric ||
    error?.error?.quotaMetric ||
    error?.quota_metric ||
    error?.error?.quota_metric;

  let quotaId: string | undefined =
    error?.quotaId ||
    error?.error?.quotaId ||
    error?.quota_id ||
    error?.error?.quota_id;

  let retryDelay: string | number | undefined =
    error?.retryDelay ||
    error?.error?.retryDelay ||
    error?.retry_delay ||
    error?.error?.retry_delay;

  const rawDetails: any[] = [];
  if (Array.isArray(error?.details)) rawDetails.push(...error.details);
  if (Array.isArray(error?.error?.details)) rawDetails.push(...error.error.details);
  if (Array.isArray(error?.response?.data?.error?.details)) rawDetails.push(...error.response.data.error.details);

  for (const detail of rawDetails) {
    if (!detail || typeof detail !== 'object') continue;

    if (!quotaMetric) {
      quotaMetric = detail.quotaMetric || detail.quota_metric || detail.metadata?.quota_metric;
    }
    if (!quotaId) {
      quotaId = detail.quotaId || detail.quota_id || detail.metadata?.quota_id;
    }
    if (!retryDelay) {
      retryDelay = detail.retryDelay || detail.retry_delay;
    }

    if (Array.isArray(detail.violations)) {
      for (const violation of detail.violations) {
        if (!violation || typeof violation !== 'object') continue;
        if (!quotaMetric && (violation.quotaMetric || violation.quota_metric)) {
          quotaMetric = violation.quotaMetric || violation.quota_metric;
        }
        if (!quotaId && (violation.quotaId || violation.quota_id)) {
          quotaId = violation.quotaId || violation.quota_id;
        }
      }
    }
  }

  const metricStr = `${quotaMetric || ''} ${quotaId || ''}`.toLowerCase();

  const isDaily =
    metricStr.includes('per_day') ||
    metricStr.includes('per-day') ||
    metricStr.includes('requests_per_day') ||
    metricStr.includes('queries_per_day') ||
    metricStr.includes('daily') ||
    metricStr.includes('rpd');

  const isPerMinute =
    metricStr.includes('per_minute') ||
    metricStr.includes('per-minute') ||
    metricStr.includes('requests_per_minute') ||
    metricStr.includes('queries_per_minute') ||
    metricStr.includes('tokens_per_minute') ||
    metricStr.includes('rpm') ||
    metricStr.includes('tpm') ||
    Boolean(retryDelay);

  return {
    quotaMetric,
    quotaId,
    retryDelay,
    isDaily,
    isPerMinute,
  };
}

// Helper to parse status and error message from API response with deep inspection of nested structures
function parseErrorInfo(error: any): {
  status?: number;
  message: string;
  code: string;
  deepDetails: string;
  quotaDetails: StructuredQuotaInfo;
} {
  const status =
    typeof error?.status === 'number'
      ? error.status
      : typeof error?.statusCode === 'number'
      ? error.statusCode
      : typeof error?.response?.status === 'number'
      ? error.response.status
      : typeof error?.error?.code === 'number'
      ? error.error.code
      : undefined;

  const code =
    error?.code ||
    error?.error?.status ||
    error?.statusText ||
    error?.name ||
    '';

  const primaryMsg = error?.message ? String(error.message) : '';
  const nestedMsg = error?.error?.message ? String(error.error.message) : '';
  const responseData = error?.response?.data ? safeStringify(error.response.data) : '';
  const details = error?.error?.details ? safeStringify(error.error.details) : '';
  const cause = error?.cause ? safeStringify(error.cause) : '';
  const serialized = safeStringify(error);

  // Consolidated deep text for comprehensive pattern matching across all nested structures
  const deepDetails = [primaryMsg, nestedMsg, responseData, details, cause, serialized]
    .filter(Boolean)
    .join(' ');

  const quotaDetails = extractStructuredQuota(error);

  return {
    status,
    message: primaryMsg || nestedMsg || 'Error desconocido',
    code: String(code),
    deepDetails,
    quotaDetails,
  };
}

interface ErrorEvaluation {
  isRecoverable: boolean;
  reason: string;
}

// Distinguish recoverable transient errors (503, 429 rate limit per minute, 500, 502, 504, timeout) from definitive errors (401, 403, 400, quota diaria o de cuenta agotada)
function isRecoverableGeminiError(error: any): ErrorEvaluation {
  const { status, message, code, deepDetails, quotaDetails } = parseErrorInfo(error);
  const lowerDeep = deepDetails.toLowerCase();
  const lowerCode = String(code).toLowerCase();

  // Errores definitivos de autenticación o permisos (no reintentar)
  if (
    status === 401 ||
    status === 403 ||
    lowerDeep.includes('api_key_invalid') ||
    lowerDeep.includes('api key not valid') ||
    lowerDeep.includes('permission_denied') ||
    lowerCode.includes('permission_denied') ||
    lowerDeep.includes('unauthorized') ||
    lowerDeep.includes('forbidden')
  ) {
    return {
      isRecoverable: false,
      reason: 'Error definitivo de autenticación o permisos (API Key inválida o no autorizada)',
    };
  }

  // Errores de solicitud inválida o recurso inexistente (no reintentar)
  if (
    status === 400 ||
    status === 404 ||
    lowerDeep.includes('invalid_argument') ||
    lowerCode.includes('invalid_argument')
  ) {
    return {
      isRecoverable: false,
      reason: 'Solicitud rechazada (parámetros no válidos o recurso no encontrado)',
    };
  }

  // Error 429: diferenciar cuota diaria/de cuenta vs cuota por minuto/transitoria
  if (
    status === 429 ||
    lowerDeep.includes('429') ||
    lowerDeep.includes('resource_exhausted') ||
    lowerCode.includes('resource_exhausted')
  ) {
    const isHardQuota =
      quotaDetails.isDaily ||
      lowerDeep.includes('per_day') ||
      lowerDeep.includes('requests per day') ||
      lowerDeep.includes('daily quota') ||
      lowerDeep.includes('rpd limit') ||
      lowerDeep.includes('quota_exceeded') ||
      lowerDeep.includes('quota exceeded') ||
      lowerDeep.includes('insufficient_quota') ||
      lowerDeep.includes('insufficient quota') ||
      lowerDeep.includes('exceeded your current quota') ||
      lowerDeep.includes('free tier limit') ||
      lowerDeep.includes('free_tier_limit') ||
      lowerDeep.includes('check your plan and billing') ||
      lowerDeep.includes('billing not active') ||
      lowerDeep.includes('project_billing_not_active');

    if (isHardQuota) {
      const metricLabel = quotaDetails.quotaMetric ? ` [métrica: ${quotaDetails.quotaMetric}]` : '';
      return {
        isRecoverable: false,
        reason: `Cuota diaria o de cuenta agotada en Gemini API${metricLabel} (no reintentable)`,
      };
    }

    const metricInfo = quotaDetails.quotaMetric
      ? ` [métrica: ${quotaDetails.quotaMetric}]`
      : quotaDetails.retryDelay
      ? ` [retryDelay: ${quotaDetails.retryDelay}]`
      : '';

    return {
      isRecoverable: true,
      reason: `Límite de tasa por minuto o saturación temporal recuperable (429/RESOURCE_EXHAUSTED)${metricInfo}`,
    };
  }

  // Errores 503, 500, 502, 504, timeout y caídas de red transitorias
  if (
    status === 503 ||
    status === 500 ||
    status === 502 ||
    status === 504 ||
    lowerDeep.includes('503') ||
    lowerDeep.includes('unavailable') ||
    lowerDeep.includes('high demand') ||
    lowerDeep.includes('overloaded') ||
    lowerDeep.includes('deadline_exceeded') ||
    lowerDeep.includes('timeout') ||
    lowerDeep.includes('aborterror') ||
    lowerDeep.includes('timeouterror') ||
    lowerDeep.includes('econnreset') ||
    lowerDeep.includes('etimedout') ||
    lowerDeep.includes('fetch failed')
  ) {
    return {
      isRecoverable: true,
      reason: 'Indisponibilidad transitoria del servicio o saturación temporal de Gemini (503/504/timeout)',
    };
  }

  return {
    isRecoverable: false,
    reason: `Error no catalogado como recuperable: ${message.slice(0, 120)}`,
  };
}

// Timeout wrapper that guarantees real network cancellation via AbortController and native @google/genai httpOptions
async function callGeminiWithTimeout(
  ai: GoogleGenAI,
  contents: any[],
  timeoutMs: number = 15000
): Promise<any> {
  const controller = new AbortController();
  let timer: NodeJS.Timeout | null = null;

  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        // Cancelar activamente la solicitud HTTP subyacente para liberar sockets y recursos
        controller.abort();
        const timeoutErr = new Error(`Tiempo de espera de ${timeoutMs}ms superado en llamada a Gemini`);
        (timeoutErr as any).name = 'TimeoutError';
        reject(timeoutErr);
      }, timeoutMs);
    });

    const apiCallPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: ORIENTIA_SYSTEM_INSTRUCTION,
        abortSignal: controller.signal,
        httpOptions: {
          timeout: timeoutMs,
        },
      },
    });

    return await Promise.race([apiCallPromise, timeoutPromise]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}

// Secure Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'La conversación debe contener al menos un mensaje.' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage?.content || '';

    // If Gemini API Key is available, invoke Gemini 3.8 Flash server-side with controlled retries
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        // Ensure Gemini contents start with a 'user' message and alternate properly
        const userAndModelMessages = messages
          .filter((m: { role: string; content: string }) => m.content && m.content.trim().length > 0)
          .map((m: { role: string; content: string }) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          }));

        // Remove any leading 'model' messages since Gemini contents must start with 'user'
        while (userAndModelMessages.length > 0 && userAndModelMessages[0].role === 'model') {
          userAndModelMessages.shift();
        }

        // If after cleaning there are no user messages, use default
        if (userAndModelMessages.length === 0) {
          userAndModelMessages.push({
            role: 'user',
            parts: [{ text: userPrompt || 'Hola OrientIA' }],
          });
        }

        const MAX_RETRIES = 2; // Intento 0 inicial + hasta 2 reintentos (máximo 3 llamadas)
        let replyText: string | null = null;

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
          try {
            if (attempt > 0) {
              // Espera progresiva: ~1500ms en intento 1 y ~3000ms en intento 2, con variación aleatoria (+/- 150ms)
              const baseDelay = attempt === 1 ? 1500 : 3000;
              const jitter = Math.floor(Math.random() * 300) - 150;
              const waitTime = Math.max(1000, baseDelay + jitter);

              console.warn(`[OrientIA Gemini] Reintento ${attempt}/${MAX_RETRIES} programado tras espera de ${waitTime}ms...`);
              await new Promise((resolve) => setTimeout(resolve, waitTime));
            }

            const response: any = await callGeminiWithTimeout(ai, userAndModelMessages, 15000);
            replyText = response?.text || 'No fue posible generar una respuesta en este momento.';
            break; // Éxito
          } catch (geminiError: any) {
            const { isRecoverable, reason } = isRecoverableGeminiError(geminiError);
            console.warn(
              `[OrientIA Gemini] Intento ${attempt + 1}/${MAX_RETRIES + 1} no completado: ${reason}. Detalle: ${geminiError?.message || geminiError}`
            );

            // Detener reintentos si el error no es transitorio/recuperable
            if (!isRecoverable) {
              console.warn('[OrientIA Gemini] Error clasificado como no recuperable; se suspenden reintentos adicionales.');
              break;
            }

            if (attempt === MAX_RETRIES) {
              console.warn('[OrientIA Gemini] Se agotaron los 2 reintentos adicionales sin éxito.');
            }
          }
        }

        if (replyText) {
          return res.json({
            reply: replyText,
            source: 'gemini-3.8-flash',
            timestamp: new Date().toISOString(),
          });
        }

        console.warn('[OrientIA Gemini] Conectando con fallback pedagógico tras agotar intentos con Gemini.');
      } catch (geminiInitError: any) {
        console.error('Error al inicializar cliente de Gemini:', geminiInitError);
      }
    }

    // Pedagogical Fallback / Educational Simulator when key is pending
    const simulatedResponse = generatePedagogicalFallback(userPrompt);
    return res.json({
      reply: simulatedResponse,
      source: 'orientia-educational-engine',
      note: 'Conexión del servidor activa. Puedes configurar tu clave de Gemini en el panel de secretos si deseas respuestas en vivo generadas por el modelo.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Internal server error in /api/chat:', error);
    return res.status(500).json({
      error: 'Ocurrió un error en el servidor de OrientIA al procesar la consulta.',
      details: error.message,
    });
  }
});

// Helper for pedagogical context when testing in development without external API calls
function generatePedagogicalFallback(query: string): string {
  const lower = query.toLowerCase();

  let advice = '';
  if (lower.includes('dat') || lower.includes('aptitud') || lower.includes('batería')) {
    advice = `### Sobre el Differential Aptitude Tests (DAT)
En la cátedra de **Orientación Vocacional y Profesional**, la batería **DAT** se analiza como una herramienta multifactorial integrada por **ocho pruebas independientes**:
1. Razonamiento Abstracto (AR)
2. Razonamiento Verbal (VR)
3. Cálculo (NA)
4. Velocidad y Precisión (CSA)
5. Relaciones Espaciales (SR)
6. Lenguaje (LU)
7. Ortografía (SP)
8. Razonamiento Mecánico (MR)

**Aspectos clave para el pedagogo:**
- Los cuadernillos de preguntas físicos forman parte del texto de avance de la docente.
- La cátedra dispone de la hoja de respuestas unificada y de los dos baremos normativos (masculino y femenino).
- Se debe interpretar el perfil diferencial de fortalezas y debilidades aptitudinales en lugar de emitir una puntuación global única.`;
  } else if (lower.includes('otis') || lower.includes('inteligencia')) {
    advice = `### Sobre el Test de Inteligencia Superior (OTIS Superior)
La versión PDF publicada de **OTIS Superior** (Arthur S. Otis) contiene **50 preguntas**, con **30 minutos de ejecución** según sus instrucciones. No debe confundirse con versiones de 75 reactivos.

**Recomendaciones pedagógicas:**
- Aclarar al orientado que las preguntas tienen dificultad creciente.
- No calificar de forma aislada; contrastar el nivel de rendimiento intelectual con los hábitos de estudio y los intereses vocacionales manifestados.`;
  } else if (lower.includes('keirsey') || lower.includes('temperamento')) {
    advice = `### Sobre el Determinante de Temperamento de Keirsey
Basado en las tipologías junguianas, clasifica la personalidad en cuatro grandes temperamentos: **Artesanos (SP)**, **Guardianes (SJ)**, **Idealistas (NF)** y **Racionales (NT)**.

**Pautas para la orientación:**
- Ningún temperamento es superior a otro; cada uno aporta dones distintivos en distintos campos de desempeño profesional.
- Es un instrumento de autoexploración reflexiva que no debe utilizarse como etiqueta rígida o determinante.`;
  } else if (lower.includes('ipp')) {
    advice = `### Sobre Intereses y Preferencias Profesionales (IPP)
El documento **IPP** publicado contiene **204 elementos** y una hoja de respuestas organizada en **17 campos (I–XVII)**. Es distinto del Cuestionario de Intereses Ocupacionales, que tiene **10 secciones A–J**.

**Revisión documental pendiente:** La página 11 del PDF, correspondiente a la hoja de respuestas, presenta errores internos de compresión. Se requiere una copia íntegra y confirmar las instrucciones y alternativas de respuesta con la cátedra antes de su aplicación. No se han verificado escalas de consistencia ni un tiempo de aplicación en este documento.

**Pautas de mediación pedagógica:**
- Comparar si existe congruencia entre el gusto por una profesión y el agrado hacia las tareas de estudio requeridas para formarse en ella.
- Vincular las áreas de interés con las carreras vigentes en la UAGRM y la oferta formativa técnica y superior.`;
  } else if (lower.includes('intereses')) {
    advice = `### Sobre el Cuestionario de Intereses Ocupacionales
El PDF disponible contiene **60 actividades distribuidas en 10 secciones A–J**, con seis actividades por sección. La escala va de **1 (me desagrada mucho) a 5 (me gusta mucho)**.

Las áreas de su clasificación son: al aire libre, mecánico, cálculo, científico, persuasivos, artístico-plásticos, literarios, musicales, servicio social y oficina. No debe confundirse con los 17 campos del IPP.

La autoría original, edición y tiempo de aplicación requieren confirmación de la cátedra. Su uso es de apoyo a la reflexión vocacional; no constituye un diagnóstico automático.`;
  } else if (lower.includes('hábito') || lower.includes('estudio')) {
    advice = `### Sobre el Test de Hábitos de Estudio
El PDF publicado contiene **40 preguntas** con tres respuestas: **Siempre (3), Algunas veces (2) y Nunca (1)**.

La clave de la hoja de respuestas menciona **Hábitos Higiénicos**, **Condiciones Materiales**, **Hábitos de Estudio** y **Capacidad de Estudio**. Presenta una discrepancia de siglas ME/HE que debe aclarar la cátedra; OrientIA no calcula puntuaciones ni inventa reglas de corrección. La autoría original, edición y tiempo de aplicación requieren confirmación.

**Acción orientadora:**
- Es el punto de partida para programas de tutoría pedagógica y prevención del abandono universitario en los primeros semestres de la UAGRM.`;
  } else if (lower.includes('rol') || lower.includes('educación') || lower.includes('pedagogo') || lower.includes('docente')) {
    advice = `### El Rol del Licenciado en Ciencias de la Educación en la Orientación
El orientador educativo no "elige" la carrera del estudiante; su función esencial es **acompañar la toma de decisiones conscientes, informadas y autónomas**.

**Áreas clave de intervención:**
- **Acompañamiento reflexivo:** Fortalecer la autonomía del sujeto en su deliberación vocacional.
- **Triangulación pedagógica:** Contrastar intereses, aptitudes, hábitos de estudio y condiciones socioeconómicas.
- **Proyecto de vida:** Concebir la vocación no como un destino predeterminado, sino como una trayectoria construida activamente.`;
  } else {
    advice = `Gracias por tu consulta a **OrientIA**.

Como estudiante de **Ciencias de la Educación** en la **UAGRM**, estoy aquí para acompañarte en la asignatura **Orientación Vocacional y Profesional**.

¿En cuál de estos aspectos deseas profundizar?
- Fundamentos y metodología de los **6 instrumentos de la cátedra** (Intereses Ocupacionales, OTIS Superior, Keirsey, Hábitos de Estudio, IPP y batería DAT).
- Criterios de administración y uso de la hoja de respuestas y baremos normativos.
- El rol orientador del pedagogo en la formulación de proyectos de vida.`;
  }

  return advice;
}

// Vite integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    // Production hosts the API only; GitHub Pages serves the frontend and PDFs.
    app.use((_req, res) => {
      res.status(404).json({ error: 'Ruta no encontrada en la API de OrientIA.' });
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    // Serve static files from public/ directly (such as tests/*.html and instruments/*.pdf)
    app.use(express.static(path.resolve(__dirname, 'public')));

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OrientIA server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
