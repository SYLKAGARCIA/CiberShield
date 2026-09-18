/**
 * Constantes de autenticación que deben poder importarse desde
 * `middleware.ts`, el cual corre en el Edge Runtime de Next.js.
 *
 * El Edge Runtime NO soporta Prisma, `bcryptjs` ni el módulo `crypto`
 * de Node — por eso este archivo está separado de `lib/auth.ts` (que sí
 * usa esas tres cosas) y no importa nada más que esto. Si necesitas
 * agregar algo aquí, verifica primero que sea compatible con Edge.
 */
export const SESSION_COOKIE_NAME = 'session_token';
