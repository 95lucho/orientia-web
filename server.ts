import express from 'express';
import { createServer as createViteServer } from 'vite';
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
   - Cuestionario de Intereses Ocupacionales
   - Test de Inteligencia Superior – OTIS Superior (Arthur S. Otis)
   - Determinante de Temperamento de Keirsey (David Keirsey)
   - Test de Hábitos de Estudio
   - Intereses y Preferencias Profesionales (IPP - María Victoria de la Cruz)
   - Differential Aptitude Tests (DAT - batería integrada por 8 pruebas: Razonamiento abstracto, Razonamiento verbal, Cálculo, Velocidad y precisión, Relaciones espaciales, Lenguaje, Ortografía y Razonamiento mecánico). Respecto al DAT, recuerda que los cuadernillos de preguntas físicos forman parte del material impreso de la docente, y se cuenta con la hoja de respuestas y los dos baremos normativos (masculino y femenino).
2. Guiar en conceptos teóricos y metodológicos de la orientación vocacional y profesional, el rol orientador del educador y el acompañamiento en la construcción de proyectos de vida.
3. No inventar preguntas, puntuaciones, baremos ni diagnósticos psicométricos automatizados. Tu enfoque es estrictamente educativo y formativo.

Tono y estilo:
- Académico, universitario, claro, ético, respetuoso y empático.
- Enfoque pedagógico centrado en la toma reflexiva y autónoma de decisiones del estudiante orientado.
- En español formal pero cercano para estudiantes universitarios de la UAGRM.
`;

// Secure Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'La conversación debe contener al menos un mensaje.' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage?.content || '';

    // If Gemini API Key is available, invoke Gemini 3.8 Flash server-side
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

        // 12-second timeout wrapper to prevent any blocking
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 12000)
        );

        const apiCallPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userAndModelMessages,
          config: {
            systemInstruction: ORIENTIA_SYSTEM_INSTRUCTION,
          },
        });

        const response: any = await Promise.race([apiCallPromise, timeoutPromise]);
        const replyText = response.text || 'No fue posible generar una respuesta en este momento.';

        return res.json({
          reply: replyText,
          source: 'gemini-3.8-flash',
          timestamp: new Date().toISOString(),
        });
      } catch (geminiError: any) {
        console.error('Error invoking Gemini API server-side:', geminiError);
        // Fallback to structured pedagogical responder if API error occurs
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
El **OTIS Superior** (Arthur S. Otis) evalúa la agilidad mental general y el razonamiento lógico bajo tiempo cronometrado estricto (30 minutos de ejecución).

**Recomendaciones pedagógicas:**
- Aclarar al orientado que las preguntas tienen dificultad creciente.
- No calificar de forma aislada; contrastar el nivel de rendimiento intelectual con los hábitos de estudio y los intereses vocacionales manifestados.`;
  } else if (lower.includes('keirsey') || lower.includes('temperamento')) {
    advice = `### Sobre el Determinante de Temperamento de Keirsey
Basado en las tipologías junguianas, clasifica la personalidad en cuatro grandes temperamentos: **Artesanos (SP)**, **Guardianes (SJ)**, **Idealistas (NF)** y **Racionales (NT)**.

**Pautas para la orientación:**
- Ningún temperamento es superior a otro; cada uno aporta dones distintivos en distintos campos de desempeño profesional.
- Es un instrumento de autoexploración reflexiva que no debe utilizarse como etiqueta rígida o determinante.`;
  } else if (lower.includes('ipp') || lower.includes('intereses')) {
    advice = `### Sobre los Instrumentos de Intereses (IPP e Intereses Ocupacionales)
El **IPP** (María Victoria de la Cruz) y el **Cuestionario de Intereses Ocupacionales** exploran la atracción o rechazo hacia 17 campos profesionales y actividades concretas de trabajo.

**Pautas de mediación pedagógica:**
- Comparar si existe congruencia entre el gusto por una profesión y el agrado hacia las tareas de estudio requeridas para formarse en ella.
- Vincular las áreas de interés con las carreras vigentes en la UAGRM y la oferta formativa técnica y superior.`;
  } else if (lower.includes('hábito') || lower.includes('estudio')) {
    advice = `### Sobre el Test de Hábitos de Estudio
Permite diagnosticar las condiciones ambientales, la planificación del tiempo, las técnicas de lectura comprensiva y la preparación para exámenes en la educación superior.

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
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
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
