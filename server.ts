import express from 'express';
import { generateLocalReply } from './src/data/localGuidance.ts';
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
      reply: generateLocalReply(messages),
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
