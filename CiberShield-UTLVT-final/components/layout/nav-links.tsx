'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ItemMenu } from '@prisma/client';
import { cn } from '@/lib/utils';

export function NavLinks({ items }: { items: ItemMenu[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const activo = item.url === '/' ? pathname === '/' : pathname.startsWith(item.url);
        return (
          <li key={item.id}>
            <Link
              href={item.url}
              aria-current={activo ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-surface-dark-elevated dark:hover:text-white',
                activo
                  ? 'text-primary-600 dark:text-white'
                  : 'text-ink-700 dark:text-slate-300'
              )}
            >
              {item.etiqueta}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
