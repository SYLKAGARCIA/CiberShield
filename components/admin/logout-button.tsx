'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
  /** 'light' (por defecto): para paneles con fondo claro/dark-mode, como /admin.
   *  'dark': para usarlo sobre fondos siempre oscuros, como la barra superior pública. */
  variant?: 'light' | 'dark';
}

export function LogoutButton({ variant = 'light' }: LogoutButtonProps) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  async function handleClick() {
    setCargando(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={cargando}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition-colors disabled:opacity-60',
        variant === 'dark'
          ? 'border-white/20 font-mono text-xs uppercase tracking-widest text-slate-300 hover:border-alerta-400 hover:text-alerta-400'
          : 'border-slate-300 text-sm text-ink-700 hover:border-alerta-500 hover:text-alerta-600 dark:border-slate-700 dark:text-slate-300'
      )}
    >
      <LogOut size={13} aria-hidden="true" />
      {cargando ? 'Saliendo...' : 'Cerrar sesión'}
    </button>
  );
}
