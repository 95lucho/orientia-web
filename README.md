# OrientIA

Aplicación de apoyo académico para Orientación Vocacional y Profesional de Ciencias de la Educación, UAGRM.

La [revisión de instrumentos](docs/revision-instrumentos.md) registra los datos contrastados con los seis PDF, sus límites y los pendientes académicos. IPP requiere una copia íntegra de su hoja de respuestas.

## Arquitectura de despliegue

- **GitHub Pages** publica el frontend y los documentos de `public/` en `https://95lucho.github.io/orientia-web/`.
- **Render** ejecuta únicamente Express y sus rutas `/api/health` y `/api/chat`. No sirve el frontend en producción; el resto de rutas devuelve un 404 JSON.
- **Desarrollo local** combina frontend y API en un servidor. La interfaz conserva la base `/orientia-web/` y utiliza la API del mismo origen.

## Requisitos y desarrollo local

Usar Node **24.22.1**, indicado en `.node-version`. `npm start` ejecuta TypeScript mediante el soporte nativo de Node 24.

```sh
npm install --package-lock=false
npm run dev
```

Abrir la ruta `/orientia-web/` del servidor local en el puerto 3000. Dejar `NODE_ENV` sin definir para desarrollo. `PORT` permite cambiar el puerto.

No es necesario configurar Gemini para revisar la interfaz o usar las respuestas educativas locales. Para respuestas del proveedor, definir `GEMINI_API_KEY` de forma segura en el backend. No usar una variable `VITE_` para esta clave: las variables del frontend son públicas.

## Validación antes de desplegar

```sh
npm run lint
npm run test:backend
npm run build
npm run test:deployment
```

Las pruebas de backend ejercitan validación, contexto, límites, reintentos, cancelación y fallos simulados de Gemini. El runner usa `--test-isolation=none` para ejecutar y contabilizar los casos que importan TypeScript nativo en Node 24. Las pruebas de despliegue arrancan procesos locales temporales y comprueban JS/CSS bajo `/orientia-web/`, los seis PDF, ambos enlaces PDF del HTML de Hábitos, salud de la API, CORS, chat local, entradas inválidas, límite de solicitudes y respuestas 404. No llaman a Gemini. Verifican que los PDF se sirven como archivos PDF, no su integridad documental completa.

No hay lockfile versionado todavía. Las instalaciones pueden resolver versiones diferentes; fijarlas se abordará en la fase de reproducibilidad.

## GitHub Pages

El workflow activo es `.github/workflows/deploy.yml`. Ejecuta TypeScript, compilación y pruebas antes de publicar el artefacto `dist`.

1. En Settings → Pages, seleccionar **GitHub Actions** como fuente.
2. Comprobar la dirección pública del servicio Render. Si difiere de `https://orientia-web.onrender.com`, definir la variable de repositorio **VITE_API_URL** con su origen HTTPS, sin `/api` ni rutas adicionales.
3. Tras la autorización para publicar, ejecutar el workflow manualmente o incorporar los cambios a `main`; los pushes a `main` también activan la publicación.

`VITE_API_URL` se incorpora durante la compilación. Cambiarla requiere volver a compilar y publicar Pages. `vite preview` sirve para revisar el frontend compilado; no incluye Express y usa la dirección de API incorporada al compilar.

Los recursos React se resuelven mediante `resolveAssetUrl`. El HTML independiente en `public/tests/` usa rutas relativas al documento, porque Vite copia `public/` sin transformar sus enlaces.

## Render (API)

`render.yaml` documenta un servicio Node con despliegue automático desactivado. Añadir el archivo al repositorio no modifica por sí solo un servicio existente. No crear otro servicio si el actual ya está configurado.

Para configurar el servicio existente manualmente, revisar:

| Ajuste | Valor |
| --- | --- |
| Runtime | Node |
| Root Directory | Raíz del repositorio |
| Node | `NODE_VERSION=24.22.1` |
| Build Command | `npm install --omit=dev --package-lock=false` |
| Start Command | `npm start` |
| Environment | `NODE_ENV=production` |
| Health Check Path | `/api/health` |
| Auto Deploy | Desactivado; despliegue manual autorizado |

Render suministra `PORT`; el servidor escucha en `0.0.0.0`. Para este servicio no se necesita ejecutar `vite build`. La integración Vite se carga únicamente en desarrollo.

La clave existente `GEMINI_API_KEY` permanece protegida en Render: no copiarla al frontend, al repositorio ni a los registros. Sin clave, el servidor devuelve respuestas educativas locales. `GEMINI_MODEL` es una variable no secreta opcional; por defecto usa `gemini-3.8-flash`, identificador mencionado en la [documentación oficial](https://ai.google.dev/gemini-api/docs/models). Su presencia en la documentación no garantiza acceso, cuota ni disponibilidad en el proyecto concreto.

`/api/health` devuelve `geminiStatus=configured-unverified` cuando existe una clave, junto al modelo y la versión (`RENDER_GIT_COMMIT`). Solo una respuesta de `/api/chat` con `source=gemini` acredita una llamada con texto utilizable. La respuesta incluye el modelo real. Si falla, se conserva la respuesta educativa con `mode=fallback`, una razón segura y un aviso visible. Las respuestas locales no consultan los PDF ni mantienen una conversación generativa.

Para revisar una publicación autorizada, enviar una consulta breve desde Pages y comprobar su fuente y aviso. Si cae al modo local, revisar el motivo indicado (acceso, modelo, cuota, timeout o respuesta vacía). Los registros propios solo muestran la categoría de fallo, nunca la clave ni el error completo del SDK. No mostrar ni compartir variables secretas para diagnosticarlo.

## Límites de la API

- JSON de hasta 64 KB; entre 1 y 24 mensajes, último mensaje del estudiante.
- Consulta de hasta 4000 caracteres; respuesta de hasta 8000; contexto total de hasta 24000.
- 12 consultas por dirección IP por minuto, 200 consultas globales por día UTC y 4 peticiones concurrentes, por proceso. La respuesta de rechazo usa HTTP 429 y `Retry-After`.
- Hasta dos intentos de Gemini de 10 segundos, espera de un segundo y máximo de 1500 tokens de salida por intento. Se desactivan los reintentos internos del SDK para evitar multiplicarlos. Los fallos definitivos no se reintentan. La desconexión del cliente cancela el trabajo pendiente.
- Las solicitudes de orígenes web ajenos se rechazan, pero CORS no autentica clientes. Los límites viven en memoria, se reinician al reiniciar el servidor y no se comparten entre réplicas. No son una garantía de facturación: cada consulta puede producir dos intentos, y quien acceda directamente a la API comparte el presupuesto global. Para escalar, harán falta almacenamiento compartido y controles de acceso o presupuesto del proveedor.
- En Render (`RENDER=true`) se confía en un salto de proxy para obtener la IP. Validar esa topología antes de añadir otros proxies; no establecer confianza ilimitada en `X-Forwarded-For`.

El origen de Pages permitido por CORS es `https://95lucho.github.io`, sin la subruta del repositorio. Un dominio personalizado requerirá actualizar los orígenes permitidos.

## Comprobaciones posteriores a una publicación autorizada

- Abrir Pages y comprobar que JS/CSS cargan sin errores.
- Abrir los seis PDF y los dos botones PDF de la página de Hábitos.
- Consultar `/api/health` en Render y comprobar `status: online`.
- Enviar una consulta desde Pages y comprobar que el navegador permite la comunicación con Render.
- Confirmar por separado el modo de respuesta: local o Gemini.

Las pruebas locales no acreditan el estado público de GitHub Pages, Render ni Gemini.
