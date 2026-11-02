import { VocationalInstrument } from '../types/vocational';

export const VOCATIONAL_INSTRUMENTS: VocationalInstrument[] = [
  {
    id: 'intereses-ocupacionales',
    name: 'Cuestionario de Intereses Ocupacionales',
    shortName: 'Intereses Ocupacionales',
    category: 'Intereses Vocacionales',
    academicAuthor: 'Instrumento curricular adaptado para orientación vocacional y profesional',
    theoreticalFramework: 'Enfoque de autoexploración de preferencias ocupacionales y campos de desempeño laboral',
    targetAudience: 'Estudiantes de educación secundaria superior, preuniversitarios y aspirantes a carreras universitarias',
    estimatedDuration: '30 a 45 minutos',
    applicationMode: 'Autoadministrado o grupal con supervisión orientadora del educador',
      description:
      'Instrumento de orientación vocacional diseñado para registrar las inclinaciones, preferencias y expectativas del estudiante hacia diversos campos ocupacionales. Permite contrastar áreas de trabajo con proyectos personales de formación técnica y universitaria.',
      objectives: [
      'Facilitar la autoexploración de intereses laborales y campos ocupacionales afines.',
      'Identificar áreas de mayor y menor motivación vocacional para encauzar el proyecto de vida.',
      'Servir como punto de partida en la entrevista de orientación vocacional y pedagógica.'
    ],
    applicatorInstructions: [
      'Asegurar un clima propicio, libre de presiones sobre prestigio social o remuneración económica.',
      'Indicar que el cuestionario explora intereses sinceros y no mide habilidades técnicas o conocimientos previos.',
      'Acompañar la interpretación con un diálogo reflexivo sobre la oferta académica local y regional en la UAGRM.'
    ],
    studentInstructions: [
      'Lee cada enunciado o actividad ocupacional y califica tu grado de agrado o preferencia con total sinceridad.',
      'Responde pensando en lo que verdaderamente te gustaría realizar en tu vida profesional.',
      'No dejes ninguna afirmación sin responder.'
    ],
    status: 'pending_items',
    itemCountExpected: 'Variable según versión curricular',
    itemFormatDescription: 'Escala de preferencias por actividades o campos de ocupación laboral.',
    materialNotes: 'Estructura lista para la integración del protocolo oficial de la cátedra.',
    pdfPath: '/instruments/intereses-ocupacionales.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Protocolo completo del Cuestionario de Intereses Ocupacionales para exploración vocacional.'
  },
  {
    id: 'otis-superior',
    name: 'Test de Inteligencia Superior – OTIS Superior',
    shortName: 'OTIS Superior',
    category: 'Inteligencia General',
    academicAuthor: 'Arthur S. Otis',
    theoreticalFramework: 'Teoría del Factor General de Inteligencia (Factor G) y rendimiento intelectual en tareas de razonamiento',
    targetAudience: 'Estudiantes del ciclo secundario superior, universitarios y postulantes a educación superior',
    estimatedDuration: '30 minutos cronometrados de ejecución efectiva (más 10 min de instrucciones)',
    applicationMode: 'Individual o colectiva con estricto control de tiempo cronometrado',
      description:
      'Prueba psicopedagógica clásica estandarizada para evaluar la capacidad mental general y la agilidad de razonamiento abstracto, verbal y numérico. Proporciona una estimación del nivel intelectual indispensable para fundamentar la exigencia académica de diversas carreras universitarias.',
      objectives: [
      'Evaluar la rapidez y flexibilidad del pensamiento para resolver problemas lógicos y conceptuales.',
      'Identificar la capacidad del orientado para adaptarse a demandas intelectuales de nivel universitario.',
      'Aportar elementos objetivos para el asesoramiento pedagógico en trayectorias formativas complejas.'
    ],
    applicatorInstructions: [
      'Controlar estrictamente el tiempo de 30 minutos desde la orden de inicio hasta la orden de detenerse.',
      'Resolver detenidamente los ejemplos demostrativos de práctica junto con los orientados antes de iniciar.',
      'Aclarar que los reactivos tienen dificultad creciente y que es preferible no detenerse demasiado en una pregunta difícil.'
    ],
    studentInstructions: [
      'Esta prueba contiene preguntas de razonamiento verbal, numérico y lógico.',
      'Para cada pregunta, elige la alternativa correcta entre las opciones disponibles.',
      'Trabaja con la mayor rapidez y exactitud posible. Dispones de un tiempo límite de 30 minutos.'
    ],
    status: 'pending_items',
    itemCountExpected: 75,
    itemFormatDescription: '75 reactivos de opción múltiple con 5 alternativas (A, B, C, D, E).',
    materialNotes: 'Reactivos de dificultad progresiva con límite estricto de tiempo.',
    pdfPath: '/instruments/otis-superior.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Protocolo y cuadernillo oficial del Test de Inteligencia Superior OTIS Superior.'
  },
  {
    id: 'keirsey-temperamento',
    name: 'Determinante de Temperamento de Keirsey',
    shortName: 'Keirsey',
    category: 'Temperamento y Personalidad',
    academicAuthor: 'David Keirsey',
    theoreticalFramework: 'Teoría tipológica de cuatro temperamentos (Artesano, Guardián, Idealista, Racional) basada en Jung y Myers-Briggs',
    targetAudience: 'Jóvenes y adultos en procesos de orientación vocacional, profesional o desarrollo organizacional',
    estimatedDuration: '25 a 35 minutos',
    applicationMode: 'Autoadministrado individual o grupal',
      description:
      'Cuestionario de autoobservación que clasifica el temperamento en cuatro grandes patrones conductuales: Guardianes (SJ), Artesanos (SP), Idealistas (NF) y Racionales (NT). Permite al estudiante comprender sus estilos preferenciales de interacción, toma de decisiones y ambientes laborales más congruentes con su personalidad.',
      objectives: [
      'Identificar el temperamento dominante y las preferencias disposicionales del sujeto.',
      'Reconocer entornos de trabajo, estilos de liderazgo y metodologías de estudio acordes a la propia tipología.',
      'Promover el autoconocimiento reflexivo sin etiquetar de forma estática la conducta humana.'
    ],
    applicatorInstructions: [
      'Enfatizar que ningún temperamento es mejor o peor que otro; todos presentan fortalezas y áreas de desarrollo.',
      'Instar a responder con base en la conducta habitual y espontánea, no en lo que se considere socialmente deseable.',
      'Utilizar los resultados como disparador de diálogo sobre afinidades con perfiles profesionales.'
    ],
    studentInstructions: [
      'En cada uno de los ítems se presentan dos alternativas (A y B).',
      'Elige aquella que mejor describa tu manera espontánea de actuar o sentir en la mayoría de las situaciones.',
      'Procura no pensar demasiado la respuesta; tu primera inclinación suele ser la más certera.'
    ],
    status: 'pending_items',
    itemCountExpected: 70,
    itemFormatDescription: '70 preguntas con formato de elección forzada dicotómica (Opción A vs. Opción B).',
    materialNotes: 'Explora las dimensiones E/I, S/N, T/F y J/P según el modelo Keirsey.',
    pdfPath: '/instruments/keirsey.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Protocolo y cuestionario de autoobservación del Determinante de Temperamento de Keirsey.'
  },
  {
    id: 'habitos-estudio',
    name: 'Test de Hábitos de Estudio',
    shortName: 'Hábitos de Estudio',
    category: 'Hábitos y Técnicas de Estudio',
    academicAuthor: 'Instrumento psicopedagógico de evaluación formativa de técnicas de estudio',
    theoreticalFramework: 'Psicología educativa del aprendizaje autorregulado y métodos de trabajo intelectual',
    targetAudience: 'Estudiantes de educación secundaria y estudiantes universitarios (especialmente de primeros semestres)',
    estimatedDuration: '20 a 30 minutos',
    applicationMode: 'Individual o grupal en aula o gabinete psicopedagógico',
      description:
      'Instrumento de diagnóstico pedagógico indispensable en Ciencias de la Educación para evaluar las conductas de estudio: distribución del tiempo, condiciones ambientales del lugar de estudio, métodos de lectura y síntesis, toma de apuntes y preparación para exámenes.',
      objectives: [
      'Detectar hábitos de estudio deficientes que obstaculizan el rendimiento académico.',
      'Diseñar planes de mejora pedagógica, tutorías universitarias y técnicas de estudio personalizadas.',
      'Apoyar la permanencia estudiantil y prevenir la deserción en la educación superior.'
    ],
    applicatorInstructions: [
      'Explicar al estudiante que el objetivo es ayudarle a mejorar su método de estudio cotidiano.',
      'Garantizar la confidencialidad de las respuestas para fomentar total honestidad.',
      'Articular la devolución de resultados con un taller práctico de técnicas de aprendizaje autorregulado.'
    ],
    studentInstructions: [
      'Lee cada una de las afirmaciones referidas a tu forma habitual de estudiar y organizar tus materias.',
      'Marca la opción que mejor refleje la frecuencia con la que realizas esa conducta (Siempre, A veces, Rara vez o Nunca).',
      'Sé sincero(a); esto permitirá identificar qué técnicas te ayudarán a estudiar con menor esfuerzo y mejores resultados.'
    ],
    status: 'pending_items',
    itemCountExpected: '30 a 50 ítems según escala',
    itemFormatDescription: 'Escala de frecuencia tipo Likert (Siempre / A veces / Rara vez / Nunca).',
    materialNotes: 'Diagnóstico formativo aplicable a tutorías de la carrera Ciencias de la Educación.',
    pdfPath: '/instruments/habitos-estudio.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Protocolo oficial del Test de Hábitos de Estudio para Ciencias de la Educación.'
  },
  {
    id: 'ipp-intereses',
    name: 'Intereses y Preferencias Profesionales (IPP)',
    shortName: 'IPP',
    category: 'Intereses Profesionales',
    academicAuthor: 'María Victoria de la Cruz López',
    theoreticalFramework: 'Evaluación multifactorial de intereses en profesiones y tareas de aprendizaje (TEA Ediciones)',
    targetAudience: 'Jóvenes a partir de 13-14 años, bachilleres y estudiantes universitarios',
    estimatedDuration: '30 a 50 minutos',
    applicationMode: 'Individual o colectiva',
      description:
      'Instrumento riguroso de orientación profesional que evalúa los intereses hacia 17 campos profesionales distintos, contrastando la preferencia por realizar tareas concretas frente a la atracción por las profesiones u ocupaciones correspondientes. Permite identificar la consistencia entre el gusto por la labor cotidiana y el título profesional.',
      objectives: [
      'Evaluar el grado de atracción o rechazo hacia 17 áreas vocacionales fundamentales (Científica, Técnica, Sanitaria, Artística, Social, etc.).',
      'Comparar los intereses manifestados hacia tareas específicas frente a profesiones reconocidas.',
      'Orientar la elección de carreras universitarias y técnicas con base en perfiles vocacionales consistentes.'
    ],
    applicatorInstructions: [
      'Instruir claramente sobre las 4 opciones de respuesta para cada actividad o profesión propuesta.',
      'Comprobar que los estudiantes entiendan que deben valorar tanto profesiones como tareas formativas.',
      'Analizar las discrepancias entre agrado por la profesión y rechazo a las materias de formación requeridas.'
    ],
    studentInstructions: [
      'Se presentan diversas actividades, tareas y profesiones.',
      'Indica para cada una tu grado de preferencia: A (Me gusta mucho), B (Me gusta algo / Indiferente), C (No me gusta) o D (Desconozco la actividad).',
      'Responde según tu interés real y no según si consideras que es fácil o difícil de estudiar.'
    ],
    status: 'pending_items',
    itemCountExpected: '204 elementos (profesiones y tareas)',
    itemFormatDescription: 'Escala de 4 alternativas (A: Me gusta / B: Indiferente / C: No me gusta / D: Desconozco).',
    materialNotes: 'Comprende 17 campos profesionales y escalas de consistencia interna.',
    pdfPath: '/instruments/ipp.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Cuadernillo y protocolo de Intereses y Preferencias Profesionales (IPP).'
  },
  {
    id: 'dat-aptitudes',
    name: 'Differential Aptitude Tests (DAT) – Batería Completa de 8 Pruebas',
    shortName: 'DAT',
    category: 'Batería de Aptitudes Diferenciales',
    academicAuthor: 'George K. Bennett, Harold G. Seashore y Alexander G. Wesman',
    theoreticalFramework: 'Teoría psicométrica de evaluación multifactorial de aptitudes intelectuales diferenciales',
    targetAudience: 'Estudiantes de educación secundaria superior, bachillerato y educación universitaria',
    estimatedDuration: 'Aplicación en varias sesiones (cada subprueba dispone de su propio límite cronometrado de 20 a 30 min)',
    applicationMode: 'Colectiva o individual con hoja de respuestas estandarizada y tiempos independientes por prueba',
      description:
      'Batería clásica e integrada compuesta por ocho pruebas psicopedagógicas diseñadas para medir la capacidad de aprender o desarrollar habilidades en áreas específicas del rendimiento intelectual. En el marco de la cátedra de Orientación Vocacional y Profesional, esta batería se concibe como una unidad que articula ocho dimensiones cognitivas.',
      objectives: [
      'Evaluar de forma diferenciada las fortalezas y áreas de mejora en 8 aptitudes cognitivas clave.',
      'Proporcionar un perfil aptitudinal objetivo para orientar hacia áreas científicas, tecnológicas, humanísticas, administrativas o artísticas.',
      'Contrastar el perfil de aptitudes con los intereses declarados por el estudiante para orientar decisiones realistas y fundamentadas.'
    ],
    applicatorInstructions: [
      'IMPORTANTE: La batería DAT consta de 8 pruebas independientes que deben aplicarse con cronometraje estricto para cada subcuadernillo.',
      'Utilizar la hoja de respuestas oficial donde el estudiante marca sus elecciones.',
      'Para la corrección e interpretación se deben contrastar las puntuaciones directas con los dos baremos normativos diferenciados: baremo masculino y baremo femenino.',
      'No calificar globalmente; el valor de la batería radica en el perfil diferencial entre las ocho aptitudes.'
    ],
    studentInstructions: [
      'La batería DAT evalúa diversas capacidades a través de ocho cuadernillos de ejercicios.',
      'Para cada prueba dispondrás de un tiempo determinado de trabajo.',
      'Registra todas tus respuestas exclusivamente en la hoja de respuestas proporcionada, rellenando el espacio correspondiente.',
      'No escribas en los cuadernillos de preguntas físicos.'
    ],
    status: 'pending_items',
    itemCountExpected: 'Ocho cuadernillos independientes con tiempo cronometrado',
    itemFormatDescription: '8 pruebas con ítems de opción múltiple con hoja de respuestas unificada y baremos masculino y femenino.',
    materialNotes:
      'AVISO DE LA CÁTEDRA: Los ocho cuadernillos con las preguntas están dentro del texto físico de avance de la docente (sin versión digitalizada actual). Se dispone formalmente de la hoja de respuestas y de los dos baremos de interpretación normativos: masculino y femenino. En apego a los principios éticos y metodológicos, no se inventan reactivos ni se implementa corrección automática.',
    hasPhysicalBooklets: true,
    hasAnswerSheetAndNorms: true,
    pdfPath: '/instruments/dat.pdf',
    pdfButtonLabel: 'Descargar DAT y material de corrección',
    pdfDescription: 'Documento oficial completo que reúne el instrumento DAT, la hoja de respuestas estandarizada y el material de corrección con los baremos normativos (masculino y femenino) autorizados por la cátedra.',
    subtests: [
      {
        id: 'dat-ar',
        name: 'Razonamiento Abstracto',
        shortCode: 'AR',
        evaluationArea: 'Razonamiento no verbal y resolución lógica de problemas visuales',
        description: 'Evalúa la capacidad para razonar con figuras y patrones geométricos sin intervención del lenguaje verbal.'
      },
      {
        id: 'dat-vr',
        name: 'Razonamiento Verbal',
        shortCode: 'VR',
        evaluationArea: 'Comprensión y estructuración conceptual del lenguaje',
        description: 'Mide la habilidad para comprender conceptos abstractos formulados en palabras y relaciones analógicas complejas.'
      },
      {
        id: 'dat-na',
        name: 'Cálculo',
        shortCode: 'NA',
        evaluationArea: 'Habilidad matemática y razonamiento cuantitativo',
        description: 'Examina la capacidad para resolver operaciones numéricas, problemas aritméticos y razonamiento cuantitativo.'
      },
      {
        id: 'dat-csa',
        name: 'Velocidad y Precisión',
        shortCode: 'CSA',
        evaluationArea: 'Atención sostenida y rapidez perceptiva clerical',
        description: 'Mide la rapidez y exactitud al comparar y cotejar secuencias de letras y números bajo presión de tiempo.'
      },
      {
        id: 'dat-sr',
        name: 'Relaciones Espaciales',
        shortCode: 'SR',
        evaluationArea: 'Visualización y manipulación tridimensional de objetos',
        description: 'Evalúa la habilidad para visualizarMentalmente objetos tridimensionales a partir de patrones bidimensionales plegados.'
      },
      {
        id: 'dat-lu',
        name: 'Lenguaje',
        shortCode: 'LU',
        evaluationArea: 'Uso normativo, puntuación y sintaxis del idioma',
        description: 'Mide la corrección gramatical, sintáctica y la estructura adecuada del discurso escrito.'
      },
      {
        id: 'dat-sp',
        name: 'Ortografía',
        shortCode: 'SP',
        evaluationArea: 'Reconocimiento y discriminación ortográfica',
        description: 'Examina el dominio ortográfico al discriminar palabras escritas correcta o incorrectamente.'
      },
      {
        id: 'dat-mr',
        name: 'Razonamiento Mecánico',
        shortCode: 'MR',
        evaluationArea: 'Comprensión práctica de leyes físicas y principios mecánicos',
        description: 'Evalúa la comprensión intuitiva de principios físicos y mecánicos en situaciones cotidianas e industriales.'
      }
    ]
  }
];
