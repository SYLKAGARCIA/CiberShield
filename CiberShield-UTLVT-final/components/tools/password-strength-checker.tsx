'use client';

import { useState } from 'react';
import { Eye, EyeOff, Check, X, ShieldAlert } from 'lucide-react';
import { evaluarFortaleza, ETIQUETA_NIVEL, COLOR_NIVEL } from '@/lib/tools/password-utils';
import { cn } from '@/lib/utils';

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const resultado = evaluarFortaleza(password);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
      <label htmlFor="password-check" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
        Escribe una contraseña para evaluarla
      </label>
      <div className="relative">
        <input
          id="password-check"
          type={visible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          placeholder="Escribe aquí..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-11 font-mono text-sm text-ink-900 placeholder:font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700 dark:bg-surface-dark dark:text-white"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 dark:text-slate-500"
        >
          {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={cn('h-full rounded-full transition-all duration-300', COLOR_NIVEL[resultado.nivel])}
          style={{ width: `${resultado.puntaje}%` }}
        />
      </div>
      <p className="mt-1.5 text-sm">
        Fortaleza:{' '}
        <span className="font-semibold text-ink-900 dark:text-white">
          {ETIQUETA_NIVEL[resultado.nivel]}
        </span>
      </p>

      <ul className="mt-5 space-y-2">
        {resultado.criterios.map((criterio) => (
          <li key={criterio.etiqueta} className="flex items-center gap-2 text-sm">
            {criterio.cumplido ? (
              <Check size={15} className="shrink-0 text-seguro-500" aria-hidden="true" />
            ) : (
              <X size={15} className="shrink-0 text-ink-700/40 dark:text-slate-600" aria-hidden="true" />
            )}
            <span
              className={
                criterio.cumplido
                  ? 'text-ink-900 dark:text-white'
                  : 'text-ink-700/60 dark:text-slate-500'
              }
            >
              {criterio.etiqueta}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-start gap-2 rounded-lg border border-primary-500/20 bg-primary-50 p-3 text-xs text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/5 dark:text-primary-300">
        <ShieldAlert size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
        Esta evaluación ocurre solo en tu navegador. Aun así, evita escribir aquí una
        contraseña que ya uses de verdad — practica con una inventada.
      </div>
    </div>
  );
}
