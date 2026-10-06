import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  titulo: string;
  descripcion?: string;
  icono?: LucideIcon;
}

/**
 * Se muestra cuando una lista aún no tiene contenido (ej. el
 * administrador todavía no cargó recursos). El mensaje explica qué
 * pasó y qué esperar, en vez de dejar un espacio vacío sin contexto.
 */
export function EmptyState({ titulo, descripcion, icono: Icono = Inbox }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700">
      <Icono size={28} className="text-ink-700/40 dark:text-slate-500" aria-hidden="true" />
      <p className="mt-4 font-display text-lg font-semibold text-ink-900 dark:text-white">
        {titulo}
      </p>
      {descripcion && (
        <p className="mt-1.5 max-w-sm text-sm text-ink-700 dark:text-slate-400">
          {descripcion}
        </p>
      )}
    </div>
  );
}
