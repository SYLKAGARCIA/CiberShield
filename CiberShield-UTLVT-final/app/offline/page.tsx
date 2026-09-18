import type { Metadata } from 'next';
import { WifiOff } from 'lucide-react';

export const metadata: Metadata = { title: 'Sin conexión' };

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-ink-700 dark:bg-surface-dark-elevated dark:text-slate-400">
        <WifiOff size={26} aria-hidden="true" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-semibold text-ink-900 dark:text-white">
        Sin conexión a internet
      </h1>
      <p className="mt-2 text-ink-700 dark:text-slate-400">
        Esta página todavía no se había guardado para uso sin conexión. Las páginas que ya
        visitaste antes deberían seguir estando disponibles.
      </p>
    </div>
  );
}
