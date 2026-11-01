import { PromptTemplate } from '../types/vocational';

export interface PromptCriterion {
  id: string;
  label: string;
  description: string;
  example: string;
  weight: number;
}

export const PROMPT_EVALUATION_CRITERIA: PromptCriterion[] = [
  {
    id: 'role',
    label: 'Definición de Rol Pedagógico',
    description: 'Especificar la identidad profesional o perspectiva del modelo (ej. asesor pedagógico, orientador educativo, docente tutor).',
    example: 'Actúa como orientador vocacional con enfoque sociopedagógico y comunitario...',
    weight: 25,
  },
  {
    id: 'context',
    label: 'Contextualización de la Población',
    description: 'Describir a los sujetos orientados (nivel educativo, edad, contexto sociocultural, barreras o intereses iniciales).',
    example: 'Para un grupo de 30 estudiantes de 5to año de secundaria pública de contexto periurbano...',
    weight: 25,
  },
  {
    id: 'task',
    label: 'Claridad en la Tarea Formativa',
    description: 'Definir con un verbo de acción y propósito pedagógico específico qué producto o análisis se requiere.',
    example: 'Diseña una secuencia didáctica de 3 talleres reflexivos sobre elección de proyectos de vida...',
    weight: 25,
  },
  {
    id: 'constraints',
    label: 'Restricciones Teóricas y Éticas',
    description: 'Indicar marcos conceptuales a respetar (ej. Holland, Super), límites éticos (no etiquetar ni diagnosticar) y formato.',
    example: 'Básate en el modelo de madurez vocacional de Crites, sin emitir diagnósticos cerrados y presenta el resultado en una tabla analítica.',
    weight: 25,
  },
];

export const EDUCATIONAL_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 't-1',
    title: 'Secuencia didáctica de exploración vocacional',
    category: 'Diseño de Intervención',
    targetCompetency: 'Planificación pedagógica de dispositivos grupales de orientación',
    description: 'Estructurar una intervención reflexiva para estudiantes de secundaria que enfrentan incertidumbre vocacional.',
    promptText:
      'Actúa como especialista en Orientación Vocacional y Profesional para el nivel secundario. Diseña una propuesta de 3 sesiones de orientación grupal para estudiantes de último año de bachillerato que expresan alta indecisión vocacional. Considera el enfoque de proyecto de vida de Jean Guichard. Para cada sesión incluye: objetivo pedagógico, actividad reflexiva disparadora, consigna de trabajo cooperativo y criterios de evaluación formativa. No propongas tests diagnósticos cerrados; enfócate en el autoconocimiento y la agencia del estudiante.',
  },
  {
    id: 't-2',
    title: 'Análisis crítico de dilema vocacional escolar',
    category: 'Casos de Estudio',
    targetCompetency: 'Resolución reflexiva de problemáticas vocacionales situadas',
    description: 'Evaluar factores familiares y socioeconómicos que condicionan la elección de carrera.',
    promptText:
      'Desde el rol de docente de Ciencias de la Educación en gabinete de orientación escolar, analiza el siguiente caso: Un estudiante de 17 años con alto interés artístico y humanístico es presionado por su entorno familiar para elegir una ingeniería por motivos de seguridad económica. Bríndame: 1) Análisis de tensiones psicosociales y de valores ocupacionales involucrados. 2) Tres estrategias pedagógicas para facilitar el diálogo constructivo entre la institución, el estudiante y su familia sin descalificar las preocupaciones parentales. 3) Preguntas reflexivas abiertas para la entrevista individual con el estudiante.',
  },
  {
    id: 't-3',
    title: 'Integración pedagógica de resultados RIASEC',
    category: 'Análisis de Instrumentos',
    targetCompetency: 'Triangulación pedagógica de instrumentos estandarizados',
    description: 'Aprender a interpretar y devolver resultados vocacionales formativamente en lugar de etiquetar.',
    promptText:
      'Actúa como docente orientador universitario. Explícame cómo realizar una devolución pedagógica y constructiva a un estudiante que obtuvo un perfil primario RIASEC Social-Artístico (SA), pero manifiesta temor a no encontrar inserción laboral en carreras afines. Proporciona una guía paso a paso para la entrevista de devolución, destacando cómo transferir estas competencias a nuevos campos profesionales interdisciplinarios.',
  },
  {
    id: 't-4',
    title: 'Estrategias para promover la autoeficacia vocacional',
    category: 'Dilemas Vocacionales',
    targetCompetency: 'Aplicación de la Teoría Cognitiva Social de Carrera en la escuela',
    description: 'Intervenciones pedagógicas para estudiantes que dudan de sus capacidades académicas.',
    promptText:
      'Con base en la Teoría Cognitiva Social del Desarrollo de Carrera (SCCT de Lent, Brown y Hackett), propón cuatro actividades prácticas que un pedagogo pueda implementar en el aula para fortalecer las fuentes de autoeficacia vocacional (experiencias de dominio, modelamiento vicario, persuasión social y regulación emocional) en jóvenes que subestiman su potencial académico.',
  },
];
