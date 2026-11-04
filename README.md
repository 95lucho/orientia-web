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
npm run build
npm run test:deployment
```

Las pruebas arrancan procesos locales temporales y comprueban JS/CSS bajo `/orientia-web/`, los seis PDF, ambos enlaces PDF del HTML de Hábitos, salud de la API, CORS para Pages, chat local y respuestas 404 de la API. No llaman a Gemini. Verifican que los PDF se sirven como archivos PDF, no su integridad documental completa.

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

Configurar `GEMINI_API_KEY` en los secretos del servicio si se desea Gemini. Sin clave, el servidor devuelve respuestas educativas locales. `/api/health` informa la presencia de la clave, pero no acredita su validez ni la disponibilidad del modelo. La validación de Gemini pertenece a una fase posterior.

El origen de Pages permitido por CORS es `https://95lucho.github.io`, sin la subruta del repositorio. Un dominio personalizado requerirá actualizar los orígenes permitidos.

## Comprobaciones posteriores a una publicación autorizada

- Abrir Pages y comprobar que JS/CSS cargan sin errores.
- Abrir los seis PDF y los dos botones PDF de la página de Hábitos.
- Consultar `/api/health` en Render y comprobar `status: online`.
- Enviar una consulta desde Pages y comprobar que el navegador permite la comunicación con Render.
- Confirmar por separado el modo de respuesta: local o Gemini.

Las pruebas locales no acreditan el estado público de GitHub Pages, Render ni Gemini.
