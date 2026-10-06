import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, CheckCircle2 } from 'lucide-react';
import { getIconoCategoria } from '@/lib/iconos-categorias';
import { cn } from '@/lib/utils';

export const GRADIENTES = [
  'from-primary-500 to-primary-700',
  'from-seguro-500 to-primary-600',
  'from-primary-600 to-ink-900',
  'from-alerta-600 to-primary-600',
  'from-primary-500 to-seguro-600',
  'from-ink-700 to-primary-500',
  'from-seguro-600 to-ink-900',
];

export function gradienteModulo(indice: number) {
  return GRADIENTES[indice % GRADIENTES.length];
}

interface Props {
  indice: number;
  slug: string;
  nombre: string;
  descripcion: string | null;
  lecciones: number;
  recursos: number;
  completado?: boolean;
}

export function ModuloCard({ indice, slug, nombre, descripcion, lecciones, recursos, completado }: Props) {
  const Icono = getIconoCategoria(slug);
  return (
    <Link
      href={`/modulos/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-primary-900/15 dark:border-slate-800 dark:bg-surface-dark-elevated"
    >
      <div className={cn('relative flex h-28 items-end bg-gradient-to-br p-5 text-white', gradienteModulo(indice))}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <Icono size={64} className="absolute -right-2 -top-1 text-white/15 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden="true" />
        <div className="relative flex w-full items-center justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest backdrop-blur">Módulo {indice + 1}</span>
          {completado && <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-seguro-600"><CheckCircle2 size={12} aria-hidden="true" />Completado</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink-900 group-hover:text-primary-600 dark:text-white">{nombre}</h3>
        {descripcion && <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-ink-700 dark:text-slate-400">{descripcion}</p>}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-3 text-xs text-ink-700/80 dark:text-slate-500">
            <span className="inline-flex items-center gap-1"><BookOpen size={13} aria-hidden="true" />{lecciones} {lecciones === 1 ? 'lección' : 'lecciones'}</span>
            <span className="inline-flex items-center gap-1"><FileText size={13} aria-hidden="true" />{recursos} {recursos === 1 ? 'recurso' : 'recursos'}</span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-seguro-500/10 text-seguro-600 transition-all group-hover:bg-seguro-500 group-hover:text-white dark:text-seguro-400"><ArrowRight size={15} aria-hidden="true" /></span>
        </div>
      </div>
    </Link>
  );
}
