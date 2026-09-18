import { FileText, Video, Link2, Image as ImageIcon, ArrowUpRight, type LucideIcon } from 'lucide-react';
import type { Recurso, Categoria } from '@prisma/client';

const ICONO_POR_TIPO: Record<string, LucideIcon> = {
  PDF: FileText,
  VIDEO: Video,
  ENLACE: Link2,
  IMAGEN: ImageIcon,
};

type RecursoConCategoria = Recurso & { categoria: Categoria | null };

export function ResourceCard({ recurso }: { recurso: RecursoConCategoria }) {
  const Icono = ICONO_POR_TIPO[recurso.tipo] ?? FileText;

  return (
    <a
      href={recurso.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-transparent hover:shadow-xl hover:shadow-primary-900/10 dark:border-slate-800 dark:bg-surface-dark-elevated"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-slate-200 transition-colors group-hover:bg-seguro-500 dark:bg-slate-700"
      />
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-primary-600 shadow-sm transition-colors group-hover:border-seguro-500 group-hover:text-seguro-600 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-primary-300">
        <Icono size={18} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary-600 dark:text-primary-300">
            {recurso.tipo}
            {recurso.categoria ? ` · ${recurso.categoria.nombre}` : ''}
          </span>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-ink-700/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-seguro-500 dark:text-slate-600"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-1 font-display text-base font-semibold text-ink-900 group-hover:text-primary-600 dark:text-white">
          {recurso.titulo}
        </h3>
        {recurso.descripcion && (
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-slate-400">
            {recurso.descripcion}
          </p>
        )}
      </div>
    </a>
  );
}
