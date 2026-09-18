'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ItemMenu } from '@prisma/client';
import {
  Home,
  ShieldCheck,
  AlertTriangle,
  ListChecks,
  Wrench,
  ClipboardList,
  Library,
  Newspaper,
  BookMarked,
  Circle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Los ítems de menú vienen de la base de datos (solo etiqueta + url,
 * sin ícono propio). Este mapa les asigna un ícono coherente según su
 * ruta; cualquier ítem nuevo que no esté aquí usa un ícono genérico.
 */
const ICONOS_POR_RUTA: Record<string, typeof Home> = {
  '/inicio': Home,
  '/sobre-ciberseguridad': ShieldCheck,
  '/amenazas': AlertTriangle,
  '/buenas-practicas': ListChecks,
  '/herramientas': Wrench,
  '/evaluaciones': ClipboardList,
  '/recursos': Library,
  '/noticias': Newspaper,
  '/glosario': BookMarked,
};

export function SidebarNav({ items, mostrarArticulosNoticias = false }: { items: ItemMenu[]; mostrarArticulosNoticias?: boolean }) {
  const pathname = usePathname();

  const itemsVisibles = mostrarArticulosNoticias
    ? items.filter((item) => item.url !== '/noticias')
    : items;

  return (
    <nav aria-label="Menú principal" className="space-y-1">
      {itemsVisibles.map((item) => {
        const activo = item.url === '/inicio' ? pathname === '/inicio' : pathname.startsWith(item.url);
        const Icono = item.url === '/articulos-noticias' ? Newspaper : ICONOS_POR_RUTA[item.url] ?? Circle;

        return (
          <Link
            key={item.id}
            href={item.url}
            aria-current={activo ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              activo
                ? 'bg-seguro-500/10 text-seguro-600 dark:text-seguro-400'
                : 'text-ink-700 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-surface-dark-elevated dark:hover:text-white'
            )}
          >
            <Icono size={17} aria-hidden="true" />
            {item.etiqueta}
          </Link>
        );
      })}

      {mostrarArticulosNoticias && (
        <Link
          href="/articulos-noticias"
          aria-current={pathname.startsWith('/articulos-noticias') || pathname.startsWith('/articulos/') || pathname.startsWith('/noticias/') ? 'page' : undefined}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            pathname.startsWith('/articulos-noticias') || pathname.startsWith('/articulos/') || pathname.startsWith('/noticias/')
              ? 'bg-seguro-500/10 text-seguro-600 dark:text-seguro-400'
              : 'text-ink-700 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-surface-dark-elevated dark:hover:text-white'
          )}
        >
          <Newspaper size={17} aria-hidden="true" />
          Artículos y Noticias
        </Link>
      )}
    </nav>
  );
}
