import { cn } from '@/lib/utils';

export interface IntentoResumen { porcentaje: number; detalle: { slug: string; ok: number; total: number }[]; fecha: string }

interface Props {
  inicial: IntentoResumen;
  final: IntentoResumen;
  modulos: { slug: string; nombre: string }[];
}

const pct = (d: { ok: number; total: number } | undefined) => (d && d.total ? Math.round((d.ok / d.total) * 100) : null);

/** Comparación autoevaluación inicial vs final (sin hooks: sirve en servidor y cliente). */
export function ComparacionAutoevaluacion({ inicial, final, modulos }: Props) {
  const mejora = final.porcentaje - inicial.porcentaje;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
      <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white">Tu avance: autoevaluación inicial vs. final</h3>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800"><p className="text-xs text-ink-700 dark:text-slate-400">Inicial</p><p className="font-display text-2xl font-semibold text-ink-900 dark:text-white">{inicial.porcentaje}%</p></div>
        <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800"><p className="text-xs text-ink-700 dark:text-slate-400">Final</p><p className="font-display text-2xl font-semibold text-ink-900 dark:text-white">{final.porcentaje}%</p></div>
        <div className={cn('rounded-xl p-3', mejora >= 0 ? 'bg-seguro-500/10' : 'bg-alerta-500/10')}>
          <p className="text-xs text-ink-700 dark:text-slate-400">Cambio</p>
          <p className={cn('font-display text-2xl font-semibold', mejora >= 0 ? 'text-seguro-600 dark:text-seguro-400' : 'text-alerta-600')}>{mejora > 0 ? '+' : ''}{mejora} pts</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-700 dark:text-slate-400">
        {mejora > 0 ? '¡Mejoraste! Lo que aprendiste en los módulos se nota.' : mejora === 0 ? 'Mantuviste tu nivel. Repasa los módulos con menor porcentaje.' : 'Bajó un poco: repasa los módulos con menor porcentaje y vuelve a intentarlo.'}
      </p>
      <ul className="mt-4 space-y-3">
        {modulos.map((m) => {
          const a = pct(inicial.detalle.find((d) => d.slug === m.slug));
          const b = pct(final.detalle.find((d) => d.slug === m.slug));
          if (a === null || b === null) return null;
          return (
            <li key={m.slug}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink-900 dark:text-white">{m.nombre}</span>
                <span className="shrink-0 text-ink-700 dark:text-slate-400">{a}% → {b}%</span>
              </div>
              <div className="space-y-1">
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-slate-400" style={{ width: `${a}%` }} /></div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-seguro-500" style={{ width: `${b}%` }} /></div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 flex gap-4 text-xs text-ink-700/70 dark:text-slate-500"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-slate-400" />Inicial</span><span className="inline-flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-seguro-500" />Final</span></p>
    </div>
  );
}
