import { VocationalInstrument } from '../types/vocational';

export const VOCATIONAL_INSTRUMENTS: VocationalInstrument[] = [
  {
    id: 'riasec-holland',
    name: 'Cuestionario de Intereses Profesionales (Modelo Tipológico RIASEC)',
    shortName: 'RIASEC - Holland',
    category: 'Intereses',
    academicAuthor: 'John L. Holland (Adaptaciones pedagógicas iberoamericanas)',
    theoreticalFramework: 'Teoría de la congruencia persona-ambiente vocacional de John Holland',
    targetAudience: 'Estudiantes de educación secundaria superior, bachillerato y primer año universitario',
    estimatedDuration: '25 a 35 minutos',
    applicationMode: 'Autoadministrado o grupal guiado por el pedagogo orientador',
    description:
      'Instrumento psicopedagógico ampliamente utilizado en orientación vocacional para evaluar la inclinación del orientado hacia seis ambientes y tipos de personalidad: Realista (R), Investigador (I), Artístico (A), Social (S), Emprendedor (E) y Convencional (C). Permite explorar congruencias con campos ocupacionales y trayectorias formativas.',
    objectives: [
      'Facilitar la autoexploración de intereses y actividades de agrado en contextos formativos y laborales.',
      'Generar un código tipológico primario (ej. SEC, AIR) que oriente la búsqueda de carreras y campos profesionales afines.',
      'Servir como disparador de entrevistas reflexivas sobre el proyecto de vida en el aula.'
    ],
    applicatorInstructions: [
      'Verificar que el espacio de aplicación cuente con condiciones adecuadas de silencio y concentración.',
      'Aclarar al orientado que no existen respuestas correctas o incorrectas, sino preferencias personales sinceras.',
      'Recordar que este instrumento es una guía para el autoconocimiento reflexivo, no una determinación taxativa del futuro profesional.'
    ],
    studentInstructions: [
      'Lee detenidamente cada actividad o afirmación que se presentará en este instrumento oficial.',
      'Valora tu grado de interés o agrado con total honestidad, pensando en lo que verdaderamente disfrutas hacer.',
      'No te dejes influir por la opinión de tus compañeros o la remuneración económica en esta etapa de exploración de intereses genuinos.'
    ],
    status: 'pending_items',
    itemCountExpected: 60,
    itemFormatDescription: 'Escala Likert o pares de actividades organizados en las 6 dimensiones RIASEC.'
  },
  {
    id: 'kuder-c',
    name: 'Inventario de Preferencias Vocacionales Kuder (Forma C)',
    shortName: 'Kuder-C',
    category: 'Intereses',
    academicAuthor: 'G. Frederic Kuder',
    theoreticalFramework: 'Medición de intereses vocacionales por áreas ocupacionales amplias',
    targetAudience: 'Adolescentes y adultos jóvenes en proceso de elección de carrera o cambio vocacional',
    estimatedDuration: '30 a 45 minutos',
    applicationMode: 'Individual o colectiva con técnica de elección forzada',
    description:
      'Instrumento clásico de la orientación profesional que clasifica los intereses del estudiante en diez áreas vocacionales fundamentales: Trabajo al aire libre, Interés mecánico, Interés para el cálculo, Interés científico, Interés persuasivo, Interés artístico, Interés literario, Interés musical, Interés por el servicio social e Interés en el trabajo de oficina.',
    objectives: [
      'Identificar áreas de mayor y menor interés vocacional a través de tríadas de elección forzada.',
      'Contrastar el perfil de intereses con perfiles ocupacionales estandarizados de la educación superior.',
      'Promover en el estudiante de Ciencias de la Educación la destreza para triangular perfiles vocacionales con trayectorias académicas.'
    ],
    applicatorInstructions: [
      'Explicar con claridad el formato de respuesta por tríadas (elegir la actividad que MÁS le gusta y la que MENOS le gusta del grupo).',
      'Controlar la escala de verificación (escala V) para evaluar la sinceridad y validez del protocolo.',
      'Acompañar la devolución de resultados con un diálogo pedagógico sobre opciones de formación técnica y universitaria.'
    ],
    studentInstructions: [
      'En cada grupo de tres actividades propuestas, deberás señalar cuál es la que MÁS te gustaría realizar y cuál la que MENOS te agradaría.',
      'Procura responder todas las tríadas sin dejar ninguna en blanco.',
      'Elige basándote en la actividad misma y no en si crees que posees o no la habilidad técnica para llevarla a cabo actualmente.'
    ],
    status: 'pending_items',
    itemCountExpected: 168,
    itemFormatDescription: 'Tríadas de elección forzada (Más preferida / Menos preferida).'
  },
  {
    id: 'cdmse-autoeficacia',
    name: 'Escala de Autoeficacia para la Toma de Decisiones de Carrera (CDMSE)',
    shortName: 'CDMSE - Autoeficacia',
    category: 'Autoeficacia',
    academicAuthor: 'Nancy E. Betz y Karen M. Taylor',
    theoreticalFramework: 'Teoría Cognitiva Social del Desarrollo de Carrera (SCCT) de Lent, Brown y Hackett',
    targetAudience: 'Estudiantes de últimos años de nivel medio, aspirantes universitarios y personas en reorientación',
    estimatedDuration: '20 a 30 minutos',
    applicationMode: 'Autoadministrado en formato digital o papel',
    description:
      'Evalúa el grado de confianza o seguridad que una persona percibe en sí misma para llevar a cabo con éxito las tareas y procesos implicados en la toma de decisiones vocacionales. Explora cinco subescalas esenciales: Autoevaluación, Recolección de información ocupacional, Selección de metas, Planificación de pasos futuros y Resolución de problemas.',
    objectives: [
      'Detectar bloqueos, indecisión vocacional o falta de confianza en la propia capacidad de elección.',
      'Identificar áreas pedagógicas específicas donde el orientador debe intervenir (ej. búsqueda de información, metas realistas).',
      'Promover la agencia y autonomía de los orientados en sus proyectos de vida.'
    ],
    applicatorInstructions: [
      'Enfatizar que la autoeficacia mide la creencia en la propia capacidad de acción, no un rasgo inmutable de personalidad.',
      'Utilizar los resultados para diseñar talleres de desarrollo de habilidades decisionales en el aula o gabinete de orientación.',
      'Monitorear indicadores de ansiedad vocacional asociada a la toma de decisiones complejas.'
    ],
    studentInstructions: [
      'Indica qué tan seguro(a) o capaz te sientes de realizar cada una de las tareas presentadas relacionadas con tu futuro académico y laboral.',
      'Responde con honestidad, reconociendo tanto tus fortalezas como aquellos aspectos donde aún sientes dudas o inseguridad.',
      'Tus respuestas serán utilizadas confidencialmente para acompañarte en tu proceso orientador.'
    ],
    status: 'pending_items',
    itemCountExpected: 25,
    itemFormatDescription: 'Escala de confianza de 5 puntos (1: Ninguna confianza - 5: Total confianza).'
  },
  {
    id: 'cmi-madurez-vocacional',
    name: 'Cuestionario de Madurez Vocacional (CMI)',
    shortName: 'CMI - Madurez Vocacional',
    category: 'Madurez Vocacional',
    academicAuthor: 'John O. Crites',
    theoreticalFramework: 'Teoría del Desarrollo Vocacional de Donald E. Super',
    targetAudience: 'Estudiantes del ciclo diversificado y preuniversitarios',
    estimatedDuration: '25 a 35 minutos',
    applicationMode: 'Individual o grupal con supervisión orientadora',
    description:
      'Instrumento diseñado para evaluar el grado de desarrollo evolutivo vocacional y la disposición del sujeto para abordar las tareas evolutivas propias de su etapa vital. Comprende la Escala de Actitudes (decisión, independencia, compromiso) y la Escala de Competencias (información ocupacional, resolución de dilemas vocacionales).',
    objectives: [
      'Medir la madurez del juicio vocacional y el nivel de realismo respecto al mundo formativo-laboral.',
      'Discriminar entre una indecisión evolutiva esperable y dificultades estructurales en el proceso de elección.',
      'Servir como insumo de diagnóstico curricular en programas institucionales de orientación educativa.'
    ],
    applicatorInstructions: [
      'Aclarar al grupo el concepto de madurez vocacional como un proceso continuo y formativo.',
      'No calificar como "inmaduro" al estudiante de forma despectiva; la madurez vocacional es una competencia que se estimula pedagógicamente.',
      'Propiciar debates grupales a partir de las actitudes vocacionales analizadas en la prueba.'
    ],
    studentInstructions: [
      'Lee cada enunciado relativo a cómo piensas y sientes sobre la elección de tu futuro profesional.',
      'Expresa si estás de acuerdo o en desacuerdo con cada una de las posturas planteadas.',
      'No hay respuestas correctas predeterminadas; se busca conocer tu punto de vista actual sobre tu proyecto de vida.'
    ],
    status: 'pending_items',
    itemCountExpected: 50,
    itemFormatDescription: 'Enunciados actitudinales con opción dicotómica (De acuerdo / En desacuerdo) o escala de acuerdo.'
  },
  {
    id: 'valores-ocupacionales',
    name: 'Cuestionario de Valores Ocupacionales y Laborales',
    shortName: 'Valores Laborales',
    category: 'Valores Ocupacionales',
    academicAuthor: 'Basado en el marco de Donald Super y aportes iberoamericanos de orientación educativa',
    theoreticalFramework: 'Teoría axiológica y de satisfacción vocacional del trabajo',
    targetAudience: 'Estudiantes de secundaria alta, universitarios y docentes en formación',
    estimatedDuration: '15 a 25 minutos',
    applicationMode: 'Autoadministrado con guía reflexiva',
    description:
      'Instrumento orientado a identificar cuáles son las prioridades axiológicas y las motivaciones intrínsecas y extrínsecas que guían la elección ocupacional: prestigio, altruismo y servicio a la comunidad, seguridad económica, autonomía creativa, relaciones humanas, variedad e independencia.',
    objectives: [
      'Hacer conscientes las jerarquías de valor que sustentan las aspiraciones profesionales de los estudiantes.',
      'Prevenir conflictos de valor entre la carrera elegida y el estilo de vida deseado.',
      'Vincular los valores personales con el compromiso social transformador desde la mirada de las Ciencias de la Educación.'
    ],
    applicatorInstructions: [
      'Promover un clima de respeto y pluralidad axiológica.',
      'Estimular la reflexión acerca de cómo los valores familiares y comunitarios influyen en las representaciones del éxito profesional.',
      'Articular los resultados de valores con las opciones ocupacionales prioritarias.'
    ],
    studentInstructions: [
      'Evalúa qué tan importante es para ti cada condición o valor laboral al momento de pensar en tu futuro trabajo o profesión.',
      'Clasifica los aspectos de mayor a menor relevancia para tu bienestar personal y social.',
      'Recuerda que no existen valores superiores a otros en este cuestionario, sino aquello que da sentido a tu vocación.'
    ],
    status: 'pending_items',
    itemCountExpected: 30,
    itemFormatDescription: 'Escala de importancia de 4 puntos (1: Sin importancia - 4: Muy importante).'
  }
];
