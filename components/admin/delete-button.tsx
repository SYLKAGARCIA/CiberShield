'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  accion: (id: string) => Promise<void>;
  id: string;
  etiquetaConfirmacion?: string;
}

/**
 * Botón de eliminar reutilizado en todas las tablas del panel. Pide
 * confirmación con `confirm()` nativo (suficiente para un panel interno
 * de administración) y llama a la Server Action recibida por props.
 */
export function DeleteButton({ accion, id, etiquetaConfirmacion }: DeleteButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    const confirmado = window.confirm(
      etiquetaConfirmacion ?? '¿Eliminar este elemento? Esta acción no se puede deshacer.'
    );
    if (!confirmado) return;

    setError(null);
    startTransition(async () => {
      try {
        await accion(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudo eliminar.');
      }
    });
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        aria-label="Eliminar"
        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 transition-colors hover:bg-alerta-500/10 hover:text-alerta-600 disabled:opacity-50 dark:text-slate-500"
      >
        <Trash2 size={15} aria-hidden="true" />
      </button>
      {error && <span className="text-xs text-alerta-600">{error}</span>}
    </div>
  );
}
