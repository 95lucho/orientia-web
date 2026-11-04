# Revisión documental de los seis instrumentos

Revisión técnica realizada el 4 de noviembre de 2026 sobre los PDF de `public/instruments/`. Las cifras siguientes corresponden a estos archivos; no deben extrapolarse a otras ediciones. No sustituyen la validación académica de la cátedra.

Se contrastaron texto, número de páginas y renderizado con Poppler y MuPDF. Los originales se conservaron sin cambios. Un renderizado sin errores no acredita por sí solo que todas las imágenes, reglas de corrección o tablas sean correctas.

| Documento | Páginas | Evidencia y alcance | Pendiente |
| --- | --- | --- | --- |
| Intereses Ocupacionales | 3 | Instrucciones en p. 2; diez secciones A–J, seis actividades por sección (60 en total), escala de agrado 1–5 y clasificación de diez áreas. | Autoría original, edición y tiempo de aplicación. No atribuirle los 17 campos del IPP. |
| OTIS Superior | 9 | Las instrucciones de p. 2 indican 50 preguntas y 30 minutos. Incluye preguntas y material de respuestas/corrección. | Edición exacta y validación de las reglas de corrección. No usar la descripción de 75 reactivos ni añadir diez minutos de instrucciones como tiempo documentado. |
| Keirsey | 12 | Cuestionario de 70 preguntas A/B y material de respuestas e interpretación. | Edición, adaptación y tiempo de aplicación. |
| Hábitos de Estudio | 4 | P. 2: instrucciones de 40 preguntas, Siempre=3, Algunas veces=2, Nunca=1. P. 4: hoja de respuestas y clave HH, CM, HE, CE. | Autoría original, edición, tiempo y reglas de corrección. La fila de sumas usa ME, mientras la clave usa HE: no resolver esta discrepancia sin la cátedra. |
| IPP | 11 | Elementos numerados hasta 204; p. 11 con hoja organizada en campos I–XVII. | Copia íntegra de la hoja, edición, instrucciones y significado de alternativas. No se verificaron en este PDF las cuatro opciones previamente publicadas, el tiempo ni las escalas de consistencia. |
| DAT Forma T | 8 | Pp. 1–4: portada y hojas de respuestas. Pp. 5–6: claves de corrección. Pp. 7–8: baremos masculino y femenino. Las últimas cuatro páginas son imágenes; sus encabezados se contrastaron mediante OCR durante la auditoría. | Cuadernillos de preguntas en soporte físico y sus instrucciones de tiempo. No se transcribieron ni validaron automáticamente las cifras de los baremos. |

## Incidencia de IPP

Poppler comunica dos errores `Bad block header in flate stream`, en los desplazamientos 228782 y 237282. MuPDF detecta `premature end of data in flate filter` al renderizar la página 11. Es posible obtener texto y renderizar páginas, pero eso no acredita una hoja de respuestas completa.

Se conserva el archivo y se muestra una advertencia en su ficha y en la respuesta local del chat. No se ha recompuesto, reemplazado ni reparado automáticamente: regrabarlo puede ocultar el error sin recuperar los datos perdidos. La resolución requiere una copia íntegra procedente de la cátedra, seguida de una nueva revisión de las 11 páginas y su correspondencia con la ficha.

## Identidad de los originales (SHA-256)

```text
intereses-ocupacionales.pdf  07d841b0f899a0b04e9fae464b34dad93c3f20c8626b4fdc3f5ab13d78dbb505
otis-superior.pdf           018b99bff030a51466ddb4357d38ce5aed55fed9d50658ec73b1db2a6d2049ef
keirsey.pdf                 c8392ba2ce8690fce3662a5e41bd2c9e688c2a041b5daeade5474be250893bee
habitos-estudio.pdf         6bd7fe074f3e04bb35e2d68706b920bec1201e4e90349c77d87b1a3329f1be5f
ipp.pdf                     7512846ba41285b743ac41b69d8516c4bb2be43f33ae176fa17446ed13af4543
dat.pdf                     b88887df2c93dbf2404edae8e6de05fd56ebd0aebde00f8a90d717bbd0b2e6cb
```

## Límites y mantenimiento

- Las fichas, la página HTML de Hábitos, las respuestas locales y las instrucciones del servidor reflejan los datos verificados. Los marcos teóricos y usos educativos son contexto general, no citas textuales de los PDF.
- La mención de una docente o los metadatos de Word no acreditan autoría original, edición ni licencia. Debe confirmarse su procedencia con la cátedra.
- No se implementaron pruebas digitales, puntuaciones automáticas ni interpretación de baremos.
- Al sustituir un PDF, revisar páginas, contenido, enlaces, advertencias y hash. No retirar una advertencia de integridad solo porque el archivo abre.
- Las instrucciones enviadas a Gemini incluyen estas precisiones, pero sus respuestas no se han validado con una llamada real. No hay recuperación de PDF ni citas automáticas implementadas.
