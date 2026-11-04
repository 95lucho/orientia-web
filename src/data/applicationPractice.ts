export interface ApplicationPractice {
  objective: string;
  preparation: string[];
  briefing: string;
  situation: string;
  question: string;
  options: { text: string; feedback: string; recommended?: boolean }[];
  debrief: string;
}

// Teaching situations about administration, not items from psychometric tests.
export const APPLICATION_PRACTICES: Record<string, ApplicationPractice> = {
  'intereses-ocupacionales': {
    objective: 'Explicar una escala de preferencias sin confundir interés con habilidad.',
    preparation: ['Revisa las instrucciones del PDF: 60 actividades, diez secciones A–J y escala de 1 a 5.', 'Prepara el material y un espacio donde se pueda responder sin presiones.'],
    briefing: '«Este cuestionario explora cuánto te agradan ciertas actividades. Responde según tu interés real, no según si ya sabes hacerlas. Revisaremos la escala del documento antes de empezar».',
    situation: 'Estás practicando como aplicador. Una persona pregunta: «Nunca hice esa actividad; ¿debo poner que no me gusta porque no sé hacerla?».',
    question: '¿Cómo aclararías la consigna?',
    options: [
      { text: 'Explicar que se valora el agrado, no el dominio, y volver a las instrucciones de la escala.', recommended: true, feedback: 'Es la actuación adecuada: distingues intereses de habilidades y aclaras la consigna sin responder por la persona. Si la actividad no se comprende, resuelve la duda sobre su significado sin sugerir una valoración.' },
      { text: 'Indicar que marque el valor más bajo si nunca la realizó.', feedback: 'Eso confunde falta de experiencia con desagrado e influye en la respuesta. Revisa la finalidad del cuestionario y deja que la persona valore su interés.' },
      { text: 'Elegir el número que parece más conveniente para su futura carrera.', feedback: 'El aplicador no debe dirigir las preferencias hacia una carrera. Tu tarea es explicar el procedimiento y favorecer una respuesta sincera.' },
    ],
    debrief: 'Explica con tus palabras la diferencia entre «me interesa» y «sé hacerlo». Pide a un compañero que repita la consigna para comprobar su comprensión, sin responder ningún ítem del test.',
  },
  'otis-superior': {
    objective: 'Preparar una aplicación cronometrada y aclarar dudas antes del inicio.',
    preparation: ['Confirma la versión del PDF: 50 preguntas y 30 minutos de ejecución.', 'Prepara cuadernillo, hoja de respuestas y cronómetro; revisa los ejemplos oficiales antes de dar la orden de inicio.'],
    briefing: '«Primero revisaremos las instrucciones y los ejemplos del cuadernillo. Cuando las dudas de procedimiento estén aclaradas, indicaré el inicio de los 30 minutos y dónde registrar las respuestas».',
    situation: 'Aún no iniciaste el cronómetro. Una persona dice que no entiende cómo marcar una respuesta en la hoja.',
    question: '¿Qué harías como aplicador?',
    options: [
      { text: 'Aclarar el uso de la hoja con el ejemplo oficial, comprobar la comprensión y después iniciar el tiempo.', recommended: true, feedback: 'Es la secuencia adecuada: las dudas de procedimiento se atienden antes del inicio. Utiliza los ejemplos del material y no improvises preguntas ni ayudas para resolver reactivos.' },
      { text: 'Iniciar el tiempo de inmediato y explicar durante la ejecución.', feedback: 'Iniciar sin comprobar la comprensión puede afectar las condiciones de administración. Prepara la explicación y aclara el procedimiento antes de dar la señal.' },
      { text: 'Resolver una pregunta del test para mostrar qué respuesta debe elegir.', feedback: 'Resolver un reactivo aporta ayuda sobre su contenido. Limita la explicación al procedimiento y a los ejemplos oficiales previstos.' },
    ],
    debrief: 'Ensaya una presentación de un minuto: finalidad, material, lugar de respuesta, resolución de dudas previas y señal de inicio. No pongas en marcha un test real ni interpretes puntuaciones.',
  },
  'keirsey-temperamento': {
    objective: 'Explicar la elección A/B sin inducir respuestas socialmente deseables.',
    preparation: ['Revisa el cuestionario de 70 preguntas con alternativas A/B y el material de respuestas.', 'Prepara una explicación que evite presentar un temperamento como mejor que otro.'],
    briefing: '«En cada pregunta elige la alternativa que describa mejor tu conducta habitual. No hay una opción que haga a una persona superior a otra; responde sin intentar construir una imagen ideal».',
    situation: 'Una persona te pregunta: «¿Qué opción tengo que elegir para que me salga un temperamento mejor para ser docente?».',
    question: '¿Qué respuesta protege la finalidad de la aplicación?',
    options: [
      { text: 'Aclarar que no se busca un temperamento superior y pedir que responda según su conducta habitual.', recommended: true, feedback: 'Es adecuado: reduces la presión por obtener un perfil deseado y no diriges la elección. Una tipología no determina por sí sola la aptitud para enseñar.' },
      { text: 'Recomendar las alternativas asociadas a un perfil que consideras ideal.', feedback: 'Inducir opciones altera la autoobservación. La orientación debe respetar la respuesta de la persona y evitar jerarquizar temperamentos.' },
      { text: 'Prometer que el resultado decidirá si puede ser docente.', feedback: 'El resultado no decide el acceso o idoneidad para una profesión. Evita etiquetas y promesas que el instrumento no permite sostener.' },
    ],
    debrief: 'Practica una aclaración neutral de la consigna. Después explica a un compañero por qué un temperamento no es una etiqueta rígida ni una decisión profesional.',
  },
  'habitos-estudio': {
    objective: 'Comunicar con precisión la escala de respuesta de la versión disponible.',
    preparation: ['Revisa las 40 preguntas y la consigna de la página 2: Siempre=3, Algunas veces=2, Nunca=1.', 'Prepara la hoja de respuestas. La diferencia ME/HE en sus siglas requiere aclaración de la cátedra antes de corregir.'],
    briefing: '«Responde según lo que haces habitualmente: anota 3 si lo haces siempre, 2 si lo haces algunas veces y 1 si nunca lo haces. El propósito educativo es reconocer prácticas que pueden mejorarse».',
    situation: 'Al revisar tu presentación, descubres que preparaste cuatro opciones, incluida «Rara vez», pero el PDF solo muestra tres.',
    question: '¿Qué debes hacer antes de aplicar?',
    options: [
      { text: 'Corregir la explicación para usar las tres opciones del PDF y comprobar que se entiendan.', recommended: true, feedback: 'Es adecuado: conservas las instrucciones de esta versión. No añadas categorías ni transformes puntuaciones para adaptarlas a una escala distinta.' },
      { text: 'Mantener cuatro opciones porque parecen más detalladas.', feedback: 'Añadir una opción modifica el formato del instrumento. En una aplicación debe seguirse la versión documentada y aclarar cualquier discrepancia con la cátedra.' },
      { text: 'Asignar una puntuación nueva a «Rara vez» y continuar.', feedback: 'Eso inventaría una regla de corrección. Ajusta la consigna al PDF y no calcules resultados sin criterios verificados.' },
    ],
    debrief: 'Explica la escala 3–2–1 a un compañero sin pedirle que responda el cuestionario. Solicita que la repita y registra qué dudas sobre administración o corrección debes consultar.',
  },
  'ipp-intereses': {
    objective: 'Decidir si el material está en condiciones de utilizarse antes de administrarlo.',
    preparation: ['Identifica los 204 elementos y la hoja organizada en 17 campos.', 'Comprueba la integridad del archivo: la página 11 presenta errores de compresión. Las alternativas e instrucciones de esta edición requieren confirmación.'],
    briefing: '«Antes de una aplicación necesitamos material íntegro y las instrucciones verificadas de esta versión. En esta práctica aprenderemos a revisar esos requisitos, sin responder ni corregir el IPP».',
    situation: 'Vas a preparar una sesión y detectas que parte de la hoja de respuestas de IPP no se visualiza correctamente.',
    question: '¿Cuál es la actuación responsable?',
    options: [
      { text: 'Posponer la aplicación, solicitar una copia íntegra y confirmar las instrucciones con la cátedra.', recommended: true, feedback: 'Es adecuado: la disponibilidad de algunas páginas no garantiza que la hoja esté completa. Puedes estudiar la finalidad y preparar la sesión, pero no suplir el material dañado.' },
      { text: 'Usar la hoja de Intereses Ocupacionales porque ambos exploran intereses.', feedback: 'Son instrumentos distintos, con diez secciones en Intereses Ocupacionales y 17 campos en IPP. Sus hojas, instrucciones y criterios no son intercambiables.' },
      { text: 'Reconstruir los espacios faltantes y asignar significados a las alternativas.', feedback: 'Eso inventaría parte del protocolo. Solicita material completo y verificado antes de la administración o corrección.' },
    ],
    debrief: 'Redacta una solicitud a la cátedra que indique qué archivo necesitas, qué página presenta el problema y qué instrucciones debes confirmar. Esta actividad no envía ningún mensaje.',
  },
  'dat-aptitudes': {
    objective: 'Preparar una batería de ocho pruebas respetando materiales y tiempos propios.',
    preparation: ['Distingue cuadernillos de preguntas, hojas de respuestas, claves y baremos. El PDF disponible no contiene los ocho cuadernillos.', 'Consigue los cuadernillos físicos y las instrucciones verificadas de cada subprueba. No deduzcas sus tiempos a partir de los de otra prueba.'],
    briefing: '«La batería comprende ocho pruebas. Antes de cada una revisaremos sus instrucciones, el lugar de respuesta y el tiempo que indica su material. No usaremos un tiempo único inventado para toda la batería».',
    situation: 'Tienes el PDF con hojas, claves y baremos, pero no los cuadernillos físicos ni las instrucciones de tiempo de las subpruebas.',
    question: '¿Qué puedes hacer en estas condiciones?',
    options: [
      { text: 'Practicar la organización del material y solicitar lo faltante antes de una aplicación real.', recommended: true, feedback: 'Es adecuado: puedes identificar la función de cada material y planificar la sesión, pero necesitas cuadernillos e instrucciones de cada subprueba para administrarla. Los baremos no sustituyen las preguntas.' },
      { text: 'Inventar ocho preguntas, una por aptitud, y tratarlas como una versión breve del DAT.', feedback: 'Preguntas inventadas no constituyen DAT ni permiten usar sus normas. Esta práctica enseña administración; no crea una batería ni calcula aptitudes.' },
      { text: 'Aplicar todas las pruebas con el mismo tiempo y corregir con cualquier baremo.', feedback: 'Cada subprueba requiere sus instrucciones. La corrección e interpretación deben seguir el material y los criterios de la cátedra; no se intercambian tiempos ni normas.' },
    ],
    debrief: 'Organiza verbalmente una sesión: material necesario, comprobación de instrucciones, ejemplo oficial, señal de inicio y final de cada subprueba. Señala qué no podrías hacer sin los cuadernillos físicos.',
  },
};
