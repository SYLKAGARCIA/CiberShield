'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import type { ItemMenu } from '@prisma/client';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  items: ItemMenu[];
  mostrarArticulosNoticias?: boolean;
}

export function MobileNav({ items, mostrarArticulosNoticias = false }: MobileNavProps) {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();
  const itemsVisibles = mostrarArticulosNoticias
    ? items.filter((item) => item.url !== '/noticias')
    : items;

  const publicacionesActivas =
    pathname.startsWith('/articulos-noticias') ||
    pathname.startsWith('/articulos/') ||
    pathname.startsWith('/noticias/');

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-white"
      >
        {abierto ? <X size={20} /> : <Menu size={20} />}
      </button>

      {abierto && (
        <nav
          aria-label="Menú principal (móvil)"
          className="absolute inset-x-0 top-16 z-40 border-t border-slate-200 bg-white px-6 py-4 shadow-lg animate-fade-in-up dark:border-slate-800 dark:bg-surface-dark"
        >
          <ul className="flex flex-col gap-1">
            {itemsVisibles.map((item) => {
              const activo = item.url === '/' ? pathname === '/' : pathname.startsWith(item.url);
              return (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    onClick={() => setAbierto(false)}
                    aria-current={activo ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-surface-dark-elevated',
                      activo ? 'text-primary-600 dark:text-white' : 'text-ink-700 dark:text-slate-300'
                    )}
                  >
                    {item.etiqueta}
                  </Link>
                </li>
              );
            })}

            {mostrarArticulosNoticias && (
              <li>
                <Link
                  href="/articulos-noticias"
                  onClick={() => setAbierto(false)}
                  aria-current={publicacionesActivas ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-surface-dark-elevated',
                    publicacionesActivas ? 'text-primary-600 dark:text-white' : 'text-ink-700 dark:text-slate-300'
                  )}
                >
                  Artículos y Noticias
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
