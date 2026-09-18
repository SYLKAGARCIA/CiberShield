'use client';

import { useState } from 'react';
import { Gauge, RotateCcw } from 'lucide-react';
import {
  PREGUNTAS_CALCULADORA,
  PUNTAJE_MAXIMO,
  obtenerRecomendacion,
} from '@/lib/tools/security-calculator-data';

export function SecurityCalculator() {
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const todasRespondidas = PREGUNTAS_CALCULADORA.every((p) => p.id in respuestas);

  const puntaje = PREGUNTAS_CALCULADORA.reduce(
    (acc, p) => acc + (respuestas[p.id] ? p.puntos : 0),
    0
  );

  function reiniciar() {
    setRespuestas({});
    setMostrarResultado(false);
  }

  if (mostrarResultado) {
    const porcentaje = Math.round((puntaje / PUNTAJE_MAXIMO) * 100);
    const recomendacion = obtenerRecomendacion(puntaje);

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-surface-dark-elevated">
        <div className="flex items-center gap-4">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-500/10">
            <span className="font-display text-2xl font-semibold text-primary-600 dark:text-primary-300">
              {porcentaje}%
            </span>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300">
              Tu puntaje de seguridad
            </p>
            <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-white">
              {recomendacion.nivel}
            </h3>
          </div>
        </div>

        <p className="mt-5 leading-relaxed text-ink-700 dark:text-slate-400">
          {recomendacion.mensaje}
        </p>

        <ul className="mt-6 space-y-2 border-t border-slate-200 pt-5 dark:border-slate-800">
          {PREGUNTAS_CALCULADORA.filter((p) => !respuestas[p.id]).map((p) => (
            <li key={p.id} className="text-sm text-ink-700 dark:text-slate-400">
              → {p.texto}
            </li>
          ))}
          {PREGUNTAS_CALCULADORA.every((p) => respuestas[p.id]) && (
            <li className="text-sm text-seguro-600 dark:text-seguro-400">
              Estás cumpliendo con todos los hábitos evaluados. 🎉
            </li>
          )}
        </ul>

        <button
          type="button"
          onClick={reiniciar}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-ink-700 hover:border-primary-300 dark:border-slate-700 dark:text-slate-300"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Volver a calcular
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-300">
        <Gauge size={18} aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-widest">
          {Object.keys(respuestas).length} de {PREGUNTAS_CALCULADORA.length} respondidas
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {PREGUNTAS_CALCULADORA.map((pregunta) => (
          <div
            key={pregunta.id}
            className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 dark:border-slate-800"
          >
            <p className="text-sm text-ink-900 dark:text-white">{pregunta.texto}</p>
            <div className="flex shrink-0 gap-2">
              {[
                { valor: true, etiqueta: 'Sí' },
                { valor: false, etiqueta: 'No' },
              ].map((opcion) => (
                <button
                  key={String(opcion.valor)}
                  type="button"
                  onClick={() => setRespuestas((r) => ({ ...r, [pregunta.id]: opcion.valor }))}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    respuestas[pregunta.id] === opcion.valor
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 text-ink-700 hover:bg-slate-200 dark:bg-surface-dark dark:text-slate-400'
                  }`}
                >
                  {opcion.etiqueta}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={!todasRespondidas}
        onClick={() => setMostrarResultado(true)}
        className="mt-6 inline-flex items-center rounded-lg bg-seguro-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Ver mi puntaje
      </button>
    </div>
  );
}
