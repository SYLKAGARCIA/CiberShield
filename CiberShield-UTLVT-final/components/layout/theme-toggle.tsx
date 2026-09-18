'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

/**
 * Botón que alterna entre modo claro y oscuro.
 * Se monta en cliente y espera a `mounted` antes de leer el tema, para
 * evitar diferencias de hidratación entre servidor y cliente (SSR).
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Placeholder del mismo tamaño para evitar saltos de layout (CLS)
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-slate-300 dark:hover:bg-surface-dark-elevated"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
