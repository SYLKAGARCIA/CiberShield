'use client';

import { useState, useTransition } from 'react';
import { ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { cambiarEstadoPreguntaAutoevaluacion, moverPreguntaAutoevaluacion } from './actions';

const claseBoton =
  'flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 transition-colors hover:bg-primary-50 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-500';

/** Subir/bajar dentro del módulo y activar/desactivar. Se guarda al instante. */
export function AccionesPregunta({ id, activa, esPrimera, esUltima }: { id: string; activa: boolean; esPrimera: boolean; esUltima: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function ejecutar(fn: () => Promise<void>) {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
      } catch {
        setError('No se pudo guardar.');
      }
    });
  }

  return (
    <div className="inline-flex items-center gap-1">
      <button type="button" className={claseBoton} disabled={pending || esPrimera} onClick={() => ejecutar(() => moverPreguntaAutoevaluacion(id, 'arriba'))} aria-label="Subir" title="Subir">
        <ArrowUp size={15} aria-hidden="true" />
      </button>
      <button type="button" className={claseBoton} disabled={pending || esUltima} onClick={() => ejecutar(() => moverPreguntaAutoevaluacion(id, 'abajo'))} aria-label="Bajar" title="Bajar">
        <ArrowDown size={15} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={claseBoton}
        disabled={pending}
        onClick={() => ejecutar(() => cambiarEstadoPreguntaAutoevaluacion(id, !activa))}
        aria-label={activa ? 'Desactivar' : 'Activar'}
        title={activa ? 'Desactivar (ocultar a los estudiantes)' : 'Activar (mostrar a los estudiantes)'}
      >
        {activa ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
      </button>
      {error && <span className="text-xs text-alerta-600">{error}</span>}
    </div>
  );
}
