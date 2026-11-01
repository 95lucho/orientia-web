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
    discipline: 'Ciencias de la Educación - Orientación Vocacional y Profesional',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// System instruction for OrientIA
const ORIENTIA_SYSTEM_INSTRUCTION = `
Eres OrientIA, una plataforma y asistente de inteligencia artificial pedagógica diseñada específicamente para estudiantes de la carrera de Ciencias de la Educación que cursan la asignatura de Orientación Vocacional y Profesional.

Tus funciones pedagógicas son:
1. Guiar en conceptos teóricos de la orientación vocacional: teorías de desarrollo vocacional (Super, Holland RIASEC, Ginzberg, Krumboltz), enfoques socioeducativos, madurez vocacional, y proyecto de vida.
2. Ayudar a analizar el rol orientador del educador/pedagogo en escuelas secundarias, instituciones de nivel superior y entornos no formales.
3. Apoyar en la comprensión metodológica de instrumentos y tests vocacionales (inventarios de intereses, cuestionarios de preferencias, escalas de autoeficacia) desde una perspectiva formativa y pedagógica, sin reemplazar la evaluación psicopedagógica formal ni diagnosticar.
4. Fomentar la competencia de formulación de instrucciones efectivas a la IA (Prompt Engineering en educación): evaluar si las preguntas tienen contexto institucional, población destinataria, rol claro y objetivo educativo.

Tono y estilo:
- Académico, claro, profesional, ético y empático.
- Enfoque pedagógico centrado en la toma reflexiva y autónoma de decisiones del estudiante orientado.
- Siempre en español neutro y formal-cálido.
- Si el usuario te pide interpretar un test real o inventar reactivos, recuérdale que los instrumentos deben ser aplicados según sus baremos y manuales oficiales validados por la cátedra.
`;

// Secure Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userRole, promptEvaluation } = req.body;

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
    const simulatedResponse = generatePedagogicalFallback(userPrompt, promptEvaluation);
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
function generatePedagogicalFallback(query: string, evaluation?: any): string {
  const lower = query.toLowerCase();

  let advice = '';
  if (lower.includes('test') || lower.includes('instrumento') || lower.includes('kuder') || lower.includes('holland')) {
    advice = `### Perspectiva Pedagógica sobre Instrumentos Vocacionales
En la asignatura **Orientación Vocacional y Profesional**, los instrumentos psicopedagógicos (como el RIASEC de Holland, inventarios de intereses o escalas de autoeficacia) deben ser concebidos como **herramientas de mediación y autoconocimiento**, no como etiquetas predictivas determinantes.

**Recomendaciones para el pedagogo:**
1. **Contextualización:** Analizar siempre las condiciones socioeconómicas, culturales e institucionales del sujeto.
2. **Triangulación:** Complementar los reactivos con entrevistas de orientación, biografía escolar y exploración de proyectos de vida.
3. **Rol del educador:** Facilitar la reflexión crítica del estudiante sobre sus habilidades percibidas y oportunidades del entorno laboral.`;
  } else if (lower.includes('rol') || lower.includes('educación') || lower.includes('pedagogo') || lower.includes('docente')) {
    advice = `### El Rol del Licenciado en Ciencias de la Educación en la Orientación
El orientador educativo no "elige" la carrera del sujeto; su función esencial es **acompañar el proceso de toma de decisiones conscientes y autónomas**.

**Áreas clave de intervención pedagógica:**
- **Prevención y acompañamiento:** Fortalecer la permanencia educativa y prevenir la deserción en transiciones críticas (secundaria-universidad).
- **Desarrollo de competencias de elección:** Enseñar a buscar información vocacional confiable, ponderar alternativas y gestionar la incertidumbre.
- **Enfoque transversal:** Articular con directivos, tutores y familias para crear un clima institucional propicio para la orientación continua.`;
  } else if (lower.includes('prompt') || lower.includes('instrucción') || lower.includes('ia') || lower.includes('inteligencia artificial')) {
    advice = `### Competencias de Formulación de Instrucciones a la IA (Prompt Engineering Educativo)
Para obtener respuestas rigurosas de sistemas de inteligencia artificial en orientación vocacional, aplica la estructura **R-C-T-R**:
- **Rol:** Especifica la postura técnica (ej. *"Actúa como asesor pedagógico en orientación profesional..."*).
- **Contexto:** Describe el nivel formativo, edad y contexto institucional (ej. *"Estudiantes de último año de secundaria en escuela técnica pública..."*).
- **Tarea:** Formula con precisión el producto pedagógico requerido (ej. *"Diseña una secuencia didáctica de 3 sesiones de autoconocimiento vocacional..."*).
- **Restricciones:** Define enfoque teórico y formato (ej. *"Basado en el enfoque de proyecto de vida de Guichard, sin emitir juicios deterministas y en formato tabla..."*).`;
  } else {
    advice = `Gracias por tu consulta a **OrientIA**. 

Como futuro profesional de **Ciencias de la Educación**, el abordaje de la Orientación Vocacional y Profesional exige articular el marco teórico (teorías del desarrollo y factores psicosociales) con la práctica institucional situada.

¿Deseas profundizar en alguna de estas dimensiones?
- **Fundamentos y teorías vocacionales** (Holland, Super, enfoques críticos latinoamericanos).
- **Metodología de aplicación de instrumentos** y análisis pedagógico de datos vocacionales.
- **Técnicas de formulación de prompts educativos** para diseñar actividades de orientación asistidas con IA.`;
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
