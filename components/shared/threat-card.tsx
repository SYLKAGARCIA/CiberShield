import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Amenaza } from '@/lib/amenazas-data';
import { ThreatIcon } from '@/components/shared/threat-icon';
import { cn } from '@/lib/utils';

export function ThreatCard({ amenaza }: { amenaza: Amenaza }) {
  return (
    <Link
      href={`/amenazas/${amenaza.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-alerta-500/50 hover:shadow-xl hover:shadow-alerta-500/10 dark:border-slate-800 dark:bg-surface-dark-elevated"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-alerta-500 to-alerta-400 transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-alerta-500/10 text-alerta-600 transition-colors group-hover:bg-alerta-500 group-hover:text-white dark:text-alerta-400">
          <ThreatIcon nombre={amenaza.icono} size={22} />
        </span>
        <span className={cn('rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest', amenaza.nivel === 'Alto' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-alerta-500/10 text-alerta-600 dark:text-alerta-400')}>
          Riesgo {amenaza.nivel.toLowerCase()}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink-900 group-hover:text-primary-600 dark:text-white">{amenaza.nombre}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-700 dark:text-slate-400">{amenaza.resumen}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-seguro-600 dark:text-seguro-400">Conocer más <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
    </Link>
  );
}
