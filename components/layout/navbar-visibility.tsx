'use client';

import { usePathname } from 'next/navigation';

function esRutaSinNavbar(pathname: string) {
  if (pathname.startsWith('/admin')) return true;
  if (pathname === '/login' || pathname === '/registro') return true;
  if (pathname.startsWith('/recuperar-password')) return true;
  if (pathname.startsWith('/restablecer-password')) return true;
  return false;
}

/**
 * Las páginas de login/registro/recuperación están diseñadas como
 * pantalla completa, sin barra superior (igual que el login de
 * referencia) — ahí no se muestra el navbar en absoluto.
 */
export function NavbarVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (esRutaSinNavbar(pathname)) return null;
  return <>{children}</>;
}
