'use client';

/**
 * La navegación ahora vive en la barra superior (MainNav); ya no hay
 * barra lateral. El contenido ocupa todo el ancho y cada página define
 * su propio contenedor.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
