import Link from 'next/link';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';

interface ToolCardProps {
  href: string;
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
}

export function ToolCard({ href, titulo, descripcion, icono: Icono }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-lg border border-slate-200 bg-white p-6 pt-8 transition-all hover:border-transparent hover:shadow-xl hover:shadow-primary-900/10 dark:border-slate-800 dark:bg-surface-dark-elevated"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-slate-200 transition-colors group-hover:bg-seguro-500 dark:bg-slate-700"
      />
      <div className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-primary-600 shadow-sm transition-colors group-hover:border-seguro-500 group-hover:text-seguro-600 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-primary-300">
        <Icono size={17} aria-hidden="true" />
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">
          {titulo}
        </h3>
        <ArrowUpRight
          size={16}
          className="mt-0.5 shrink-0 text-ink-700/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-seguro-500 dark:text-slate-600"
          aria-hidden="true"
        />
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-slate-400">
        {descripcion}
      </p>
    </Link>
  );
}
