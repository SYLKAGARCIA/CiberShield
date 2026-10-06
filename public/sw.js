/**
 * Service Worker de CiberShield UTLVT.
 *
 * Estrategia deliberadamente simple (sin `next-pwa` ni otras
 * librerías, para no agregar una dependencia pesada solo para esto):
 *
 * - Assets estáticos (_next/static, íconos, manifest): "cache first"
 *   — se sirven desde caché de inmediato y se actualizan en segundo
 *   plano (stale-while-revalidate).
 * - Navegación entre páginas (documentos HTML): "network first" — se
 *   intenta la red primero (para no mostrar contenido desactualizado
 *   de páginas con datos de Prisma), y si falla (sin conexión), se cae
 *   a la copia cacheada de esa página o, si nunca se visitó, a
 *   /offline.
 * - Peticiones a /api/* y Server Actions: siempre van a la red — no
 *   tendría sentido cachear un login o un envío de evaluación.
 */

const CACHE_ESTATICOS = 'cibershield-estaticos-v1';
const CACHE_PAGINAS = 'cibershield-paginas-v1';
const RUTA_OFFLINE = '/offline';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_PAGINAS).then((cache) => cache.add(RUTA_OFFLINE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres
          .filter((nombre) => nombre !== CACHE_ESTATICOS && nombre !== CACHE_PAGINAS)
          .map((nombre) => caches.delete(nombre))
      )
    )
  );
  self.clients.claim();
});

function esPeticionDeAPI(url) {
  return url.pathname.startsWith('/api/');
}

function esAssetEstatico(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname === '/icon' ||
    url.pathname === '/apple-icon'
  );
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Nunca interceptar métodos distintos de GET (evita cachear envíos
  // de formularios, Server Actions, etc.) ni peticiones a /api/*.
  if (event.request.method !== 'GET' || esPeticionDeAPI(url)) {
    return;
  }

  if (esAssetEstatico(url)) {
    event.respondWith(cacheFirstConActualizacion(event.request));
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstConFallbackOffline(event.request));
  }
});

async function cacheFirstConActualizacion(request) {
  const cache = await caches.open(CACHE_ESTATICOS);
  const cacheada = await cache.match(request);

  const actualizacion = fetch(request)
    .then((respuesta) => {
      if (respuesta.ok) cache.put(request, respuesta.clone());
      return respuesta;
    })
    .catch(() => cacheada);

  return cacheada ?? actualizacion;
}

async function networkFirstConFallbackOffline(request) {
  const cache = await caches.open(CACHE_PAGINAS);
  try {
    const respuesta = await fetch(request);
    if (respuesta.ok) cache.put(request, respuesta.clone());
    return respuesta;
  } catch {
    const cacheada = await cache.match(request);
    return cacheada ?? cache.match(RUTA_OFFLINE);
  }
}
