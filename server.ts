import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createChatLimits, requestGemini, shouldRetryGemini, toGeminiContents, validateMessages } from './backend/chat.ts';
import type { GeminiFailure, Message } from './backend/chat.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Render terminates the public connection at its reverse proxy.
if (process.env.RENDER === 'true') app.set('trust proxy', 1);
const GEMINI_MODEL = process.env.GEMINI_MODEL?.trim() || 'gemini-3.8-flash';
const chatLimits = createChatLimits();

// CORS configuration for GitHub Pages frontend and local environments
const ALLOWED_ORIGINS = [
  'https://95lucho.github.io',
  'http://localhost:3000',
  'http://localhost:5173',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Origen no permitido.', code: 'ORIGIN_NOT_ALLOWED' });
  }
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

app.use(express.json({ limit: '64kb' }));
app.use((error: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error?.type === 'entity.too.large') return res.status(413).json({ error: 'La solicitud es demasiado grande.', code: 'BODY_TOO_LARGE' });
  if (error?.type === 'entity.parse.failed') return res.status(400).json({ error: 'El cuerpo debe ser JSON válido.', code: 'INVALID_JSON' });
  next(error);
});

// Healthcheck endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    app: 'OrientIA',
    institution: 'Universidad Autónoma Gabriel René Moreno (UAGRM)',
    faculty: 'Facultad de Humanidades',
    discipline: 'Ciencias de la Educación - Orientación Vocacional y Profesional',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY?.trim()),
    geminiModel: GEMINI_MODEL,
    geminiStatus: process.env.GEMINI_API_KEY?.trim() ? 'configured-unverified' : 'not-configured',
    version: process.env.RENDER_GIT_COMMIT?.slice(0, 7) || 'local',
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

// Validate before spending provider quota. Limits apply per running server instance.
app.post('/api/chat', async (req, res) => {
  let messages: Message[];
  try {
    messages = validateMessages(req.body);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message, code: 'INVALID_MESSAGES' });
  }
  const permit = chatLimits.acquire(req.ip || req.socket.remoteAddress || 'unknown');
  if (!permit.ok) {
    res.setHeader('Retry-After', permit.retryAfter);
    return res.status(429).json({ error: 'Se alcanzó el límite temporal de consultas. Inténtalo más tarde.', code: 'CHAT_LIMIT' });
  }

  const controller = new AbortController();
  const disconnect = () => { if (!res.writableEnded) controller.abort(); };
  res.on('close', disconnect);
  try {
    let reason: GeminiFailure | 'not-configured' = 'not-configured';
    if (process.env.GEMINI_API_KEY?.trim()) {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { retryOptions: { attempts: 1 } },
      });
      const result = await requestGemini({
        signal: controller.signal,
        recoverable: shouldRetryGemini,
        generate: (signal) => ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: toGeminiContents(messages),
          config: {
            systemInstruction: ORIENTIA_SYSTEM_INSTRUCTION,
            maxOutputTokens: 1500,
            abortSignal: signal,
            httpOptions: { timeout: 10000, retryOptions: { attempts: 1 } },
          },
        }),
      });
      if ('reply' in result) {
        return res.json({ reply: result.reply, source: 'gemini', model: GEMINI_MODEL, mode: 'gemini', timestamp: new Date().toISOString() });
      }
      reason = result.reason;
      // Do not log raw SDK errors: they may contain request details or credentials.
      console.warn(`[OrientIA] Gemini no disponible: ${reason}`);
    }
    const notes: Record<GeminiFailure | 'not-configured', string> = {
      'not-configured': 'Respuesta educativa local. Gemini no está configurado en este servidor.',
      authentication: 'Respuesta educativa local. Gemini rechazó el acceso; el administrador debe revisar la configuración en Render.',
      'model-unavailable': 'Respuesta educativa local. El modelo configurado no está disponible para este servicio.',
      quota: 'Respuesta educativa local. Gemini informó un límite de cuota.',
      timeout: 'Respuesta educativa local. Gemini no respondió dentro del tiempo permitido.',
      'empty-response': 'Respuesta educativa local. Gemini no devolvió texto utilizable.',
      'provider-unavailable': 'Respuesta educativa local. No fue posible obtener una respuesta de Gemini.',
    };
    return res.json({
      reply: generatePedagogicalFallback(messages.at(-1)!.content),
      source: 'orientia-educational-engine',
      mode: reason === 'not-configured' ? 'local' : 'fallback',
      reason, note: notes[reason], timestamp: new Date().toISOString(),
    });
  } catch {
    if (!controller.signal.aborted && !res.headersSent) {
      return res.status(503).json({ error: 'El servicio no pudo procesar la consulta. Inténtalo más tarde.', code: 'CHAT_UNAVAILABLE' });
    }
  } finally {
    permit.release();
    res.off('close', disconnect);
  }
});

// Helper for pedagogical context when testing in development without external API calls
function generatePedagogicalFallback(query: string): string {
  const lower = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let advice = '';
  if ((/\bdat\b/.test(lower)) || lower.includes('aptitud') || lower.includes('bateria')) {
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
  } else if (lower.includes('habito') || lower.includes('estudio')) {
    advice = `### Sobre el Test de Hábitos de Estudio
El PDF publicado contiene **40 preguntas** con tres respuestas: **Siempre (3), Algunas veces (2) y Nunca (1)**.

La clave de la hoja de respuestas menciona **Hábitos Higiénicos**, **Condiciones Materiales**, **Hábitos de Estudio** y **Capacidad de Estudio**. Presenta una discrepancia de siglas ME/HE que debe aclarar la cátedra; OrientIA no calcula puntuaciones ni inventa reglas de corrección. La autoría original, edición y tiempo de aplicación requieren confirmación.

**Acción orientadora:**
- Es el punto de partida para programas de tutoría pedagógica y prevención del abandono universitario en los primeros semestres de la UAGRM.`;
  } else if (lower.includes('orientacion') || lower.includes('vocacion') || lower.includes('proyecto de vida')) {
    advice = `### ¿Qué es la orientación vocacional?
La **orientación vocacional** es un proceso de acompañamiento que ayuda a conocer tus intereses, habilidades, valores y circunstancias para tomar decisiones informadas sobre estudios, trabajo y proyecto de vida. No consiste en que un test o una persona elija una carrera por ti.

### ¿Cómo se trabaja?
1. **Autoconocimiento:** explorar qué actividades disfrutas, qué aprendes con facilidad y qué valoras.
2. **Información:** investigar carreras, planes de estudio, tareas profesionales, costos y oportunidades reales.
3. **Contraste:** relacionar esa información con tus capacidades, hábitos y condiciones personales.
4. **Decisión y seguimiento:** elegir una alternativa, planificar pasos concretos y revisar la decisión con nuevas experiencias.

**Ejemplo:** Si te gusta ayudar a otras personas, puedes comparar tareas de educación, salud o trabajo social. Conversar con profesionales y participar en actividades de esas áreas aporta información que un resultado de test aislado no ofrece.

En Ciencias de la Educación, el orientador facilita esta reflexión mediante entrevistas, actividades y uso responsable de instrumentos. Los seis instrumentos de OrientIA son recursos de apoyo; no producen una decisión ni un diagnóstico automático.

¿Qué te gustaría profundizar: autoconocimiento, comparación de carreras o elaboración de un proyecto de vida?`;
  } else if (lower.includes('rol') || lower.includes('educacion') || lower.includes('pedagogo') || lower.includes('docente')) {
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
