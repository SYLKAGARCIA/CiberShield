/**
 * Tipos globales del proyecto.
 * Se irán ampliando conforme se agreguen entidades (Fase 2 en adelante).
 */

export type Theme = 'light' | 'dark' | 'system';

export interface NavLink {
  href: string;
  label: string;
}
