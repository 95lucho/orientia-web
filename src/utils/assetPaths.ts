/**
 * Resuelve rutas de activos estáticos (como documentos PDF) respetando
 * la URL base configurada en la aplicación (import.meta.env.BASE_URL).
 *
 * Requisitos:
 * - Aceptar rutas con o sin barra inicial.
 * - Evitar duplicar barras entre la URL base y la ruta del archivo.
 * - Conservar las URL externas si existieran (http://, https://, protocol-relative //, data:, blob:).
 * - Manejar de manera segura rutas vacías, nulas o indefinidas devolviendo una cadena vacía.
 *
 * @param path Ruta del activo estático o URL
 * @returns Ruta normalizada lista para su uso en elementos <a> o <iframe>
 */
export function resolveAssetUrl(path?: string | null): string {
  if (!path || typeof path !== 'string') {
    return '';
  }

  const trimmedPath = path.trim();
  if (trimmedPath === '') {
    return '';
  }

  // Conservar URLs externas intactas
  if (/^(?:https?:)?\/\//i.test(trimmedPath) || trimmedPath.startsWith('data:') || trimmedPath.startsWith('blob:')) {
    return trimmedPath;
  }

  // Obtener la base configurada en Vite (por ejemplo: '/orientia-web/' en producción o '/' en local)
  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';

  // Asegurar que baseUrl termine con una sola barra
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // Remover cualquier barra diagonal repetida al inicio de la ruta del activo
  const normalizedPath = trimmedPath.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
}
