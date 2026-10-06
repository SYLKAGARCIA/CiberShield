export const SITE_NAME = 'CiberShield UTLVT';
export const SITE_DESCRIPTION =
  'Plataforma educativa de la UTLVT para la concientización de estudiantes en ciberseguridad.';

// Usada para URLs canónicas, Open Graph, el sitemap y robots.txt
// (Fase 9). En producción, definir NEXT_PUBLIC_SITE_URL con el dominio
// real (ej. "https://cibershield.utlvt.edu"); en desarrollo local cae
// en localhost por defecto.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

// NOTA: la navegación (header/footer) ya no se define aquí como
// constante estática. Desde la Fase 3, Navbar y Footer consultan el
// modelo `ItemMenu` en la base de datos (ver repository/menu.repository.ts),
// para que el administrador pueda editar los menús sin tocar código
// (ver panel administrativo, Fase 6).
