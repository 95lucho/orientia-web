import { VocationalInstrument } from '../types/vocational';

export const VOCATIONAL_INSTRUMENTS: VocationalInstrument[] = [
  {
    id: 'intereses-ocupacionales',
    name: 'Cuestionario de Intereses Ocupacionales',
    shortName: 'Intereses Ocupacionales',
    category: 'Intereses Vocacionales',
    theoreticalFramework: 'Enfoque de autoexploración de preferencias ocupacionales y campos de desempeño laboral',
    targetAudience: 'Estudiantes de educación secundaria superior, preuniversitarios y aspirantes a carreras universitarias',
    estimatedDuration: 'No indicada en el PDF; confirmar con la cátedra',
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
    itemCountExpected: '60 actividades distribuidas en 10 secciones (A–J)',
    itemFormatDescription: '10 secciones de 6 actividades; escala de 1 (me desagrada mucho) a 5 (me gusta mucho).',
    materialNotes: 'PDF disponible: 3 páginas con instrucciones, secciones A–J y clasificación de intereses. No corresponde a los 17 campos del IPP. Edición y tiempo de aplicación pendientes de confirmación.',
    pdfPath: '/instruments/intereses-ocupacionales.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Cuestionario disponible de Intereses Ocupacionales: instrucciones, actividades y clasificación por diez áreas.'
  },
  {
    id: 'otis-superior',
    name: 'Test de Inteligencia Superior – OTIS Superior',
    shortName: 'OTIS Superior',
    category: 'Inteligencia General',
    theoreticalFramework: 'Teoría del Factor General de Inteligencia (Factor G) y rendimiento intelectual en tareas de razonamiento',
    targetAudience: 'Estudiantes del ciclo secundario superior, universitarios y postulantes a educación superior',
    estimatedDuration: '30 minutos de ejecución, según las instrucciones del PDF',
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
    itemCountExpected: 50,
    itemFormatDescription: '50 preguntas de opción múltiple con 5 alternativas (A, B, C, D, E).',
    materialNotes: 'PDF disponible: 9 páginas. Sus instrucciones indican 50 preguntas y 30 minutos; no debe confundirse con versiones de 75 reactivos. La edición exacta queda pendiente de confirmación.',
    pdfPath: '/instruments/otis-superior.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Protocolo y cuadernillo oficial del Test de Inteligencia Superior OTIS Superior.'
  },
  {
    id: 'keirsey-temperamento',
    name: 'Determinante de Temperamento de Keirsey',
    shortName: 'Keirsey',
    category: 'Temperamento y Personalidad',
    theoreticalFramework: 'Teoría tipológica de cuatro temperamentos (Artesano, Guardián, Idealista, Racional) basada en Jung y Myers-Briggs',
    targetAudience: 'Jóvenes y adultos en procesos de orientación vocacional, profesional o desarrollo organizacional',
    estimatedDuration: 'No indicada en el PDF; confirmar con la cátedra',
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
    materialNotes: 'PDF disponible: 12 páginas con 70 preguntas A/B y material de respuestas e interpretación. La edición exacta y el tiempo de aplicación quedan pendientes de confirmación.',
    pdfPath: '/instruments/keirsey.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Protocolo y cuestionario de autoobservación del Determinante de Temperamento de Keirsey.'
  },
  {
    id: 'habitos-estudio',
    name: 'Test de Hábitos de Estudio',
    shortName: 'Hábitos de Estudio',
    category: 'Hábitos y Técnicas de Estudio',
    theoreticalFramework: 'Psicología educativa del aprendizaje autorregulado y métodos de trabajo intelectual',
    targetAudience: 'Estudiantes de educación secundaria y estudiantes universitarios (especialmente de primeros semestres)',
    estimatedDuration: 'No indicada en el PDF; confirmar con la cátedra',
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
      'Anota 3 si lo haces siempre, 2 si lo haces algunas veces y 1 si nunca lo haces, según las instrucciones del PDF.',
      'Sé sincero(a); esto permitirá identificar qué técnicas te ayudarán a estudiar con menor esfuerzo y mejores resultados.'
    ],
    status: 'pending_items',
    itemCountExpected: 40,
    itemFormatDescription: '40 preguntas con tres respuestas: Siempre (3), Algunas veces (2) y Nunca (1).',
    materialNotes: 'PDF disponible: 4 páginas con instrucciones, 40 preguntas y hoja de respuestas. La clave menciona Hábitos Higiénicos, Condiciones Materiales, Hábitos de Estudio y Capacidad de Estudio. Existe una discrepancia de siglas ME/HE en la hoja; su corrección e interpretación requieren confirmación de la cátedra. No se calcula una puntuación automática.',
    pdfPath: '/instruments/habitos-estudio.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Protocolo oficial del Test de Hábitos de Estudio para Ciencias de la Educación.'
  },
  {
    id: 'ipp-intereses',
    name: 'Intereses y Preferencias Profesionales (IPP)',
    shortName: 'IPP',
    category: 'Intereses Profesionales',
    theoreticalFramework: 'Evaluación multifactorial de intereses en profesiones y tareas de aprendizaje (TEA Ediciones)',
    targetAudience: 'Jóvenes a partir de 13-14 años, bachilleres y estudiantes universitarios',
    estimatedDuration: 'No indicada en el PDF; confirmar con la cátedra',
    applicationMode: 'Individual o colectiva',
      description:
      'Instrumento riguroso de orientación profesional que evalúa los intereses hacia 17 campos profesionales distintos, contrastando la preferencia por realizar tareas concretas frente a la atracción por las profesiones u ocupaciones correspondientes. Permite identificar la consistencia entre el gusto por la labor cotidiana y el título profesional.',
      objectives: [
      'Evaluar el grado de atracción o rechazo hacia 17 áreas vocacionales fundamentales (Científica, Técnica, Sanitaria, Artística, Social, etc.).',
      'Comparar los intereses manifestados hacia tareas específicas frente a profesiones reconocidas.',
      'Orientar la elección de carreras universitarias y técnicas con base en perfiles vocacionales consistentes.'
    ],
    applicatorInstructions: [
      'Confirmar con la cátedra las instrucciones y alternativas de respuesta de esta edición antes de administrarla.',
      'Comprobar que los estudiantes entiendan que deben valorar tanto profesiones como tareas formativas.',
      'Analizar las discrepancias entre agrado por la profesión y rechazo a las materias de formación requeridas.'
    ],
    studentInstructions: [
      'Se presentan diversas actividades, tareas y profesiones.',
      'Solicita las instrucciones de respuesta de la versión utilizada; el PDF publicado no permite verificar el significado de las alternativas.',
      'Responde según tu interés real y no según si consideras que es fácil o difícil de estudiar.'
    ],
    status: 'pending_items',
    itemCountExpected: '204 elementos (profesiones y tareas)',
    itemFormatDescription: '204 elementos numerados y hoja organizada en 17 campos (I–XVII). Las alternativas de respuesta requieren confirmación.',
    materialNotes: 'PDF disponible: 11 páginas. La página 11 (hoja de respuestas) presenta errores internos de compresión detectados por dos lectores. Se necesita una copia íntegra y confirmar edición, instrucciones y correspondencia de campos antes de su aplicación.',
    pdfPath: '/instruments/ipp.pdf',
    pdfButtonLabel: 'Descargar instrumento PDF',
    pdfDescription: 'Documento IPP disponible con elementos numerados hasta 204 y hoja de respuestas. Integridad de la página 11 pendiente de resolución.',
    pdfWarning: 'El PDF de IPP presenta errores internos en la página 11, correspondiente a la hoja de respuestas. Su visualización puede estar incompleta. Se requiere una copia íntegra antes de utilizarla para aplicar o corregir el instrumento.'
  },
  {
    id: 'dat-aptitudes',
    name: 'Differential Aptitude Tests (DAT) – Batería de 8 Pruebas',
    shortName: 'DAT',
    category: 'Batería de Aptitudes Diferenciales',
    theoreticalFramework: 'Teoría psicométrica de evaluación multifactorial de aptitudes intelectuales diferenciales',
    targetAudience: 'Estudiantes de educación secundaria superior, bachillerato y educación universitaria',
    estimatedDuration: 'Tiempos por subprueba: consultar los cuadernillos físicos y el manual de la cátedra',
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
    pdfButtonLabel: 'Descargar hojas y material de corrección DAT',
    pdfDescription: 'PDF de 8 páginas: hojas de respuestas (páginas 1–4), claves de corrección (5–6) y baremos masculino y femenino (7–8). No incluye los ocho cuadernillos de preguntas, que permanecen en soporte físico.',
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
        description: 'Evalúa la habilidad para visualizar mentalmente objetos tridimensionales a partir de patrones bidimensionales plegados.'
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
