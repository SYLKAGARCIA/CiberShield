import {
  ShieldAlert,
  Bug,
  Users,
  KeyRound,
  Share2,
  Wifi,
  Lock,
  ShieldQuestion,
  type LucideIcon,
} from 'lucide-react';

/**
 * Asocia el `slug` de cada Categoria (ver prisma/seed.ts) con un ícono.
 * Si en el futuro se agrega una categoría sin entrada aquí, se usa
 * `ShieldQuestion` como ícono por defecto en vez de fallar.
 */
export const iconoPorSlug: Record<string, LucideIcon> = {
  phishing: ShieldAlert,
  malware: Bug,
  'ingenieria-social': Users,
  contrasenas: KeyRound,
  'redes-sociales': Share2,
  'redes-wifi': Wifi,
  'privacidad-datos': Lock,
};

export function getIconoCategoria(slug: string): LucideIcon {
  return iconoPorSlug[slug] ?? ShieldQuestion;
}
