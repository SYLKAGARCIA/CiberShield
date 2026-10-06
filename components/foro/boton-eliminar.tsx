'use client';

import { Trash2 } from 'lucide-react';

/** Botón con confirmación; recibe una Server Action ya enlazada con sus argumentos. */
export function BotonEliminar({ accion, etiqueta = 'Eliminar' }: { accion: () => Promise<void>; etiqueta?: string }) {
  return (
    <form action={accion} onSubmit={(e) => { if (!confirm('¿Seguro que deseas eliminarlo? Esta acción no se puede deshacer.')) e.preventDefault(); }}>
      <button type="submit" className="inline-flex items-center gap-1 text-xs font-medium text-ink-700/70 hover:text-alerta-600 dark:text-slate-500">
        <Trash2 size={12} aria-hidden="true" />{etiqueta}
      </button>
    </form>
  );
}
