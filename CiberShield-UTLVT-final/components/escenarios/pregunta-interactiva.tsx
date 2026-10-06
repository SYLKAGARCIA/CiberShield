'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { barajarOpciones } from '@/lib/barajar';

interface Props {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
  etiqueta?: string;
}

/** Pregunta de una sola respuesta con retroalimentación inmediata. */
export function PreguntaInteractiva({ pregunta, opciones: opcionesOriginales, correcta: correctaOriginal, explicacion, etiqueta }: Props) {
  const { opciones, correcta } = useMemo(() => barajarOpciones(opcionesOriginales, correctaOriginal, pregunta), [opcionesOriginales, correctaOriginal, pregunta]);
  const [elegida, setElegida] = useState<number | null>(null);
  const respondida = elegida !== null;
  const acierto = elegida === correcta;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-surface-dark-elevated sm:p-6">
      {etiqueta && <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary-600 dark:text-primary-300">{etiqueta}</p>}
      <p className="font-display text-base font-semibold leading-snug text-ink-900 dark:text-white sm:text-lg">{pregunta}</p>

      <div className="mt-4 space-y-2" role="radiogroup" aria-label="Opciones de respuesta">
        {opciones.map((op, i) => {
          const esElegida = elegida === i;
          const esCorrecta = respondida && i === correcta;
          const esErrada = respondida && esElegida && i !== correcta;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={esElegida}
              disabled={respondida}
              onClick={() => setElegida(i)}
              className={cn(
                'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all',
                !respondida && 'border-slate-200 hover:border-seguro-500 hover:bg-seguro-500/5 dark:border-slate-700',
                esCorrecta && 'border-seguro-500 bg-seguro-500/10 text-ink-900 dark:text-white',
                esErrada && 'border-alerta-500 bg-alerta-500/10 text-ink-900 dark:text-white',
                respondida && !esCorrecta && !esErrada && 'border-slate-200 opacity-60 dark:border-slate-700'
              )}
            >
              <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold', esCorrecta ? 'border-seguro-500 bg-seguro-500 text-white' : esErrada ? 'border-alerta-500 bg-alerta-500 text-white' : 'border-slate-300 text-ink-700 dark:border-slate-600 dark:text-slate-400')}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-ink-900 dark:text-slate-200">{op}</span>
            </button>
          );
        })}
      </div>

      {respondida && (
        <div role="status" className={cn('mt-4 flex gap-3 rounded-xl border p-4 text-sm animate-fade-in-up', acierto ? 'border-seguro-500/30 bg-seguro-500/5' : 'border-alerta-500/30 bg-alerta-500/5')}>
          {acierto ? <CheckCircle2 className="mt-0.5 shrink-0 text-seguro-500" size={18} aria-hidden="true" /> : <XCircle className="mt-0.5 shrink-0 text-alerta-600" size={18} aria-hidden="true" />}
          <div>
            <p className="font-semibold text-ink-900 dark:text-white">{acierto ? '¡Correcto!' : 'No es la opción más segura'}</p>
            <p className="mt-1 leading-relaxed text-ink-700 dark:text-slate-400">
              {!acierto && <>La respuesta segura es: <strong>{opciones[correcta]}</strong>. </>}
              {explicacion}
            </p>
            <button type="button" onClick={() => setElegida(null)} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-300">
              <RotateCcw size={12} aria-hidden="true" /> Intentar de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
