'use client';

import { usePathname } from 'next/navigation';
import type { ItemMenu } from '@prisma/client';
import { SidebarNav } from './sidebar-nav';

function esRutaSinSidebar(pathname: string) {
  if (pathname.startsWith('/admin')) return true;
  if (pathname === '/login' || pathname === '/registro') return true;
  if (pathname.startsWith('/recuperar-password')) return true;
  if (pathname.startsWith('/restablecer-password')) return true;
  return false;
}

export function SiteShell({
  items,
  children,
  mostrarArticulosNoticias = false,
}: {
  items: ItemMenu[];
  children: React.ReactNode;
  mostrarArticulosNoticias?: boolean;
}) {
  const pathname = usePathname();

  if (esRutaSinSidebar(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <SidebarNav items={items} mostrarArticulosNoticias={mostrarArticulosNoticias} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
