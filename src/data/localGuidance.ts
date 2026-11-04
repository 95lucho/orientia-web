import { localTopics } from './localTopics.ts';

// Helper for pedagogical context when testing in development without external API calls
function instrumentReply(query: string): string {
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


interface LocalMessage { role: string; content: string }
const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const instrumentMatchers = [
  /\bdat\b|bateria de aptitudes/, /otis/, /keirsey|temperamento/,
  /\bipp\b/, /intereses ocupacionales/, /habitos de estudio|test de habitos|cuestionario de habitos/,
];
function instrumentQuery(text: string) {
  if (localTopics.estudio.match.test(text)) return null;
  const index = instrumentMatchers.findIndex((pattern) => pattern.test(text));
  return index < 0 ? null : ['DAT', 'OTIS', 'Keirsey', 'IPP', 'Intereses Ocupacionales', 'Test de Hábitos de Estudio'][index];
}

export function generateLocalReply(messages: LocalMessage[]): string {
  const queries = messages.filter((message) => message.role === 'user').map((message) => normalize(message.content));
  const current = queries.at(-1) || '';
  const followup = /ejemplo|actividad|ejercicio|profundiza|amplia|explica mas|mas detalle|continua|como se aplica|como aplic|precaucion|como se corr|como corr/.test(current);
  let context = current;
  const topicFor = (text: string) => Object.values(localTopics).find((topic) => topic.match.test(text));
  if (followup && !instrumentQuery(current) && (!topicFor(current) || /como.*corr/.test(current))) {
    const previous = queries.slice(0, -1).reverse().find((query) => instrumentQuery(query) || topicFor(query) || /orientacion|vocacional/.test(query));
    if (previous) context = previous;
  }

  if (/compar|diferencia/.test(current) && /otis/.test(current) && /ipp/.test(current)) {
    return `### OTIS e IPP: ¿qué diferencia hay?
**OTIS Superior** explora razonamiento bajo tiempo: el PDF disponible indica **50 preguntas y 30 minutos**. **IPP** explora preferencias hacia tareas y profesiones: tiene **204 elementos** y una hoja organizada en **17 campos**.

No miden lo mismo: disfrutar una actividad no equivale a haber desarrollado todas las habilidades para realizarla. Ambos resultados requieren contexto y acompañamiento; ninguno elige una carrera por el estudiante.

**Ejemplo educativo:** una persona puede mostrar interés por actividades científicas y necesitar fortalecer hábitos o conocimientos. Eso abre preguntas y acciones de aprendizaje, no una prohibición de estudiar una carrera.

**Material pendiente:** la página 11 del IPP presenta daños; no debe utilizarse para corregir sin una copia íntegra.

¿Quieres revisar la finalidad de OTIS o las precauciones de IPP?`;
  }
  if (/compar|diferencia/.test(current) && /ipp/.test(current) && /ocupacional/.test(current)) {
    return `### Dos instrumentos de intereses diferentes
El **Cuestionario de Intereses Ocupacionales** tiene **60 actividades en 10 secciones A–J**, con escala de **1 a 5**. El **IPP** contiene **204 elementos** y una hoja organizada en **17 campos**.

No se deben intercambiar instrucciones, claves o categorías. Las alternativas de respuesta de esta edición del IPP requieren confirmación y su página 11 necesita una copia íntegra.

**Ejemplo:** comparar actividades que atraen a un estudiante puede abrir una entrevista sobre experiencias y carreras, pero no permite convertir categorías de un cuestionario en resultados del otro.

¿Quieres conocer la estructura de Intereses Ocupacionales?`;
  }

  const instrument = instrumentQuery(context);
  if (instrument) {
    const base = instrumentReply(instrument);
    if (/diagnostic|calific|puntua|baremo|corr[eij]/.test(current)) {
      return `${base}

### Corrección e interpretación
No calculo puntuaciones ni invento baremos. Consulta las instrucciones de la versión disponible y a la cátedra; una devolución debe integrar entrevista, contexto y límites del instrumento.`;
    }
    if (followup) {
      return `${base}

### Ejemplo de trabajo pedagógico
Después de presentar la finalidad de **${instrument}**, pide al estudiante que explique con sus palabras qué información puede aportar y qué no permite concluir. Relaciona esa explicación con una experiencia educativa, sin fabricar reactivos ni resultados.

### Actividad de revisión
Revisa el PDF y registra: finalidad, instrucciones disponibles, material faltante y precauciones. Contrasta las dudas con la cátedra antes de aplicar.

¿Quieres comparar este instrumento con otro o revisar sus precauciones?`;
    }
    return `${base}

### Para comprenderlo mejor
Distingue finalidad, instrucciones de administración y límites de interpretación. Un resultado aislado no determina una carrera. Puedes pedirme **un ejemplo**, **una actividad** o **precauciones** sobre este instrumento.`;
  }
  const topic = topicFor(context);
  if (topic) {
    if (followup && /ejemplo/.test(current)) return `### Ejemplo: ${topic.title}
${topic.example}

**Para reflexionar:** ¿qué información falta y qué acción permitiría obtenerla?

**Precaución:** ${topic.caution}

${topic.next}`;
    if (followup && /actividad|ejercicio/.test(current)) return `### Actividad: ${topic.title}
${topic.activity}

**Cómo revisar tu trabajo:** explica qué aprendiste, qué evidencia utilizaste y qué duda necesitas seguir explorando. No hay una puntuación psicométrica para esta actividad.

${topic.next}`;
    return `### ${topic.title}
${topic.explanation}

### Pasos para trabajarlo
${topic.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Ejemplo:** ${topic.example}

**Actividad breve:** ${topic.activity}

**Precaución:** ${topic.caution}

${topic.next}`;
  }
  if (/orientacion|vocacion|vocacional/.test(context)) {
    return `${instrumentReply('orientación vocacional')}

### Una actividad para empezar
Escribe una actividad que disfrutas, una habilidad que deseas desarrollar y una alternativa de estudio que necesitas investigar. Busca información oficial y revisa tus ideas con un orientador.

Puedes continuar con **autoconocimiento**, **proyecto de vida**, **comparar carreras**, **entrevista** o **ética**.`;
  }
  if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches)[! .]*$/.test(current)) {
    return '¡Hola! Podemos estudiar orientación vocacional con explicaciones y actividades. Por ejemplo, pregunta **«¿Cómo construyo mi proyecto de vida?»**, **«Dame una actividad de autoconocimiento»** o **«Compara OTIS e IPP»**. Este modo usa contenidos educativos preparados; no genera diagnósticos ni consulta los PDF automáticamente.';
  }
  if (/gracias/.test(current)) return 'De nada. Para continuar, puedes pedir **un ejemplo**, **una actividad** o **una explicación de otro instrumento**. ¿Qué tema quieres trabajar?';
  return `### Podemos precisar tu consulta
El modo local incluye orientación vocacional, autoconocimiento, decisiones, proyecto de vida, entrevista, rol del orientador, ética, hábitos de estudio y los seis instrumentos. No puedo desarrollar con fiabilidad cualquier tema fuera de esta base.

Prueba una consulta concreta: **«Explica el autoconocimiento»**, **«¿Cómo comparo carreras?»**, **«Dame un ejemplo de entrevista»** o **«Compara OTIS e IPP»**.

Si estabas siguiendo un tema, menciona su nombre para que pueda retomarlo.`;
}
