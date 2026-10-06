'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { generarContrasena, evaluarFortaleza, ETIQUETA_NIVEL, COLOR_NIVEL, type OpcionesGenerador } from '@/lib/tools/password-utils';
import { cn } from '@/lib/utils';

export function PasswordGenerator() {
  const [longitud, setLongitud] = useState(16);
  const [mayusculas, setMayusculas] = useState(true);
  const [minusculas, setMinusculas] = useState(true);
  const [numeros, setNumeros] = useState(true);
  const [simbolos, setSimbolos] = useState(true);
  const [password, setPassword] = useState(() =>
    generarContrasena({ longitud: 16, mayusculas: true, minusculas: true, numeros: true, simbolos: true })
  );
  const [copiado, setCopiado] = useState(false);

  const regenerar = useCallback(() => {
    setPassword(generarContrasena({ longitud, mayusculas, minusculas, numeros, simbolos }));
    setCopiado(false);
  }, [longitud, mayusculas, minusculas, numeros, simbolos]);

  // Alterna una opción y regenera con el valor NUEVO de inmediato, sin
  // pasar por el closure de `regenerar` (que en el momento del evento
  // todavía tiene el valor anterior de esta misma opción — generaría
  // la contraseña "un paso atrás" si se usara setTimeout(regenerar)).
  function alternarOpcion(
    campo: keyof Omit<OpcionesGenerador, 'longitud'>,
    valor: boolean
  ) {
    const opciones: OpcionesGenerador = {
      longitud,
      mayusculas: campo === 'mayusculas' ? valor : mayusculas,
      minusculas: campo === 'minusculas' ? valor : minusculas,
      numeros: campo === 'numeros' ? valor : numeros,
      simbolos: campo === 'simbolos' ? valor : simbolos,
    };

    if (campo === 'mayusculas') setMayusculas(valor);
    if (campo === 'minusculas') setMinusculas(valor);
    if (campo === 'numeros') setNumeros(valor);
    if (campo === 'simbolos') setSimbolos(valor);

    setPassword(generarContrasena(opciones));
    setCopiado(false);
  }

  async function copiar() {
    await navigator.clipboard.writeText(password);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  const fortaleza = evaluarFortaleza(password);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-surface-dark">
        <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-base text-ink-900 dark:text-white">
          {password}
        </code>
        <button
          type="button"
          onClick={regenerar}
          aria-label="Generar nueva contraseña"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink-700 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-400"
        >
          <RefreshCw size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={copiar}
          aria-label="Copiar contraseña"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink-700 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-400"
        >
          {copiado ? <Check size={16} className="text-seguro-500" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        </button>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={cn('h-full rounded-full transition-all', COLOR_NIVEL[fortaleza.nivel])}
          style={{ width: `${fortaleza.puntaje}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-ink-700 dark:text-slate-400">
        Fortaleza: <span className="font-medium">{ETIQUETA_NIVEL[fortaleza.nivel]}</span>
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="longitud" className="flex justify-between text-sm font-medium text-ink-900 dark:text-white">
            Longitud
            <span className="font-mono text-primary-600 dark:text-primary-300">{longitud}</span>
          </label>
          <input
            id="longitud"
            type="range"
            min={8}
            max={32}
            value={longitud}
            onChange={(e) => {
              setLongitud(Number(e.target.value));
            }}
            onMouseUp={regenerar}
            onKeyUp={regenerar}
            onTouchEnd={regenerar}
            className="mt-2 w-full accent-seguro-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { etiqueta: 'Mayúsculas (A-Z)', campo: 'mayusculas', valor: mayusculas },
              { etiqueta: 'Minúsculas (a-z)', campo: 'minusculas', valor: minusculas },
              { etiqueta: 'Números (0-9)', campo: 'numeros', valor: numeros },
              { etiqueta: 'Símbolos (!@#...)', campo: 'simbolos', valor: simbolos },
            ] as const
          ).map((opcion) => (
            <label key={opcion.etiqueta} className="flex items-center gap-2 text-sm text-ink-900 dark:text-white">
              <input
                type="checkbox"
                checked={opcion.valor}
                onChange={(e) => alternarOpcion(opcion.campo, e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-seguro-500"
              />
              {opcion.etiqueta}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={regenerar}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-seguro-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-seguro-600"
      >
        <RefreshCw size={15} aria-hidden="true" />
        Generar otra
      </button>

      <p className="mt-4 text-xs text-ink-700/70 dark:text-slate-500">
        Esta contraseña se genera y se muestra únicamente en tu navegador. No se envía ni se guarda en ningún servidor.
      </p>
    </div>
  );
}
