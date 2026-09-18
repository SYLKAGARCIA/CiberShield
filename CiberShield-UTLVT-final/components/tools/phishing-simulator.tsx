'use client';

import { useState } from 'react';
import { Mail, ShieldAlert, ShieldCheck, RotateCcw } from 'lucide-react';
import { ESCENARIOS_PHISHING } from '@/lib/tools/phishing-scenarios';
import { cn } from '@/lib/utils';

export function PhishingSimulator() {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState<boolean | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const escenario = ESCENARIOS_PHISHING[indice];
  const esUltimo = indice === ESCENARIOS_PHISHING.length - 1;

  function responder(marcoComoPhishing: boolean) {
    if (respuesta !== null) return; // evita doble clic
    setRespuesta(marcoComoPhishing);
    if (marcoComoPhishing === escenario.esPhishing) {
      setAciertos((a) => a + 1);
    }
  }

  function siguiente() {
    if (esUltimo) {
      setTerminado(true);
      return;
    }
    setIndice((i) => i + 1);
    setRespuesta(null);
  }

  function reiniciar() {
    setIndice(0);
    setRespuesta(null);
    setAciertos(0);
    setTerminado(false);
  }

  if (terminado) {
    const porcentaje = Math.round((aciertos / ESCENARIOS_PHISHING.length) * 100);
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-surface-dark-elevated">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-seguro-500/10">
          <ShieldCheck className="text-seguro-500" size={26} aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink-900 dark:text-white">
          Identificaste {aciertos} de {ESCENARIOS_PHISHING.length} correctamente
        </h3>
        <p className="mt-1 text-ink-700 dark:text-slate-400">{porcentaje}% de aciertos</p>
        <button
          type="button"
          onClick={reiniciar}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-seguro-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-seguro-600"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Practicar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3 text-xs text-ink-700/60 dark:border-slate-800 dark:text-slate-500">
        <span>
          Correo {indice + 1} de {ESCENARIOS_PHISHING.length}
        </span>
        <span>{aciertos} aciertos</span>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-ink-700 dark:bg-surface-dark dark:text-slate-400">
            <Mail size={16} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-mono text-sm text-ink-700 dark:text-slate-400">
              {escenario.remitente}
            </p>
            <p className="mt-0.5 font-display font-semibold text-ink-900 dark:text-white">
              {escenario.asunto}
            </p>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-ink-700 dark:text-slate-300">{escenario.cuerpo}</p>

        {respuesta === null ? (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => responder(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-alerta-500/40 px-4 py-2.5 text-sm font-semibold text-alerta-600 transition-colors hover:bg-alerta-500/10 dark:text-alerta-400"
            >
              <ShieldAlert size={16} aria-hidden="true" />
              Es phishing
            </button>
            <button
              type="button"
              onClick={() => responder(false)}
              className="inline-flex items-center gap-2 rounded-lg border border-seguro-500/40 px-4 py-2.5 text-sm font-semibold text-seguro-600 transition-colors hover:bg-seguro-500/10 dark:text-seguro-400"
            >
              <ShieldCheck size={16} aria-hidden="true" />
              Es legítimo
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <div
              className={cn(
                'rounded-lg border p-4 text-sm',
                respuesta === escenario.esPhishing
                  ? 'border-seguro-500/30 bg-seguro-500/5 text-seguro-700 dark:text-seguro-400'
                  : 'border-alerta-500/30 bg-alerta-500/5 text-alerta-700 dark:text-alerta-400'
              )}
            >
              <p className="font-semibold">
                {respuesta === escenario.esPhishing ? '✓ Correcto' : '✗ No exactamente'} — este
                correo {escenario.esPhishing ? 'SÍ es' : 'NO es'} phishing.
              </p>
              <p className="mt-1.5 text-ink-700 dark:text-slate-400">{escenario.explicacion}</p>
            </div>
            <button
              type="button"
              onClick={siguiente}
              className="mt-4 inline-flex items-center rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
            >
              {esUltimo ? 'Ver resultado' : 'Siguiente correo →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
