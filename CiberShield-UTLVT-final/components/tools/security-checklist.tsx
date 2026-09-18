'use client';

import { useEffect, useState } from 'react';
import { ListChecks } from 'lucide-react';
import { CHECKLIST_SEGURIDAD, type ItemChecklist } from '@/lib/tools/security-checklist-data';
import { cn } from '@/lib/utils';

const CLAVE_STORAGE = 'cibershield-checklist-seguridad';

const CATEGORIAS = Array.from(new Set(CHECKLIST_SEGURIDAD.map((i) => i.categoria)));

export function SecurityChecklist() {
  const [marcados, setMarcados] = useState<Record<string, boolean>>({});
  const [montado, setMontado] = useState(false);

  // Se lee localStorage recién en el cliente (después del montaje) para
  // evitar un desajuste de hidratación entre servidor y navegador.
  useEffect(() => {
    setMontado(true);
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      if (guardado) setMarcados(JSON.parse(guardado));
    } catch {
      // localStorage no disponible (modo privado, etc.) — se ignora,
      // el checklist simplemente no persiste entre visitas.
    }
  }, []);

  function alternar(id: string) {
    const nuevo = { ...marcados, [id]: !marcados[id] };
    setMarcados(nuevo);
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevo));
    } catch {
      // Ver comentario arriba.
    }
  }

  const completados = Object.values(marcados).filter(Boolean).length;
  const porcentaje = montado
    ? Math.round((completados / CHECKLIST_SEGURIDAD.length) * 100)
    : 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-300">
          <ListChecks size={18} aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest">Tu progreso</span>
        </div>
        <span className="font-display text-lg font-semibold text-ink-900 dark:text-white">
          {porcentaje}%
        </span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-seguro-500 transition-all duration-300"
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      <div className="mt-6 space-y-6">
        {CATEGORIAS.map((categoria) => (
          <div key={categoria}>
            <h3 className="font-display text-sm font-semibold text-ink-900 dark:text-white">
              {categoria}
            </h3>
            <ul className="mt-2 space-y-1.5">
              {CHECKLIST_SEGURIDAD.filter((item: ItemChecklist) => item.categoria === categoria).map(
                (item) => (
                  <li key={item.id}>
                    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-surface-dark">
                      <input
                        type="checkbox"
                        checked={!!marcados[item.id]}
                        onChange={() => alternar(item.id)}
                        className="h-4 w-4 rounded border-slate-300 text-seguro-500"
                      />
                      <span
                        className={cn(
                          'text-ink-900 dark:text-white',
                          marcados[item.id] && 'text-ink-700/60 line-through dark:text-slate-500'
                        )}
                      >
                        {item.texto}
                      </span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-slate-100 pt-4 text-xs text-ink-700/70 dark:border-slate-800 dark:text-slate-500">
        Tu progreso se guarda solo en este navegador (no en una cuenta ni en un servidor).
      </p>
    </div>
  );
}
