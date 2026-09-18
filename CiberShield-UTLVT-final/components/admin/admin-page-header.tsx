import Link from 'next/link';
import { Plus } from 'lucide-react';

interface AdminPageHeaderProps {
  titulo: string;
  descripcion?: string;
  nuevoHref?: string;
  nuevoEtiqueta?: string;
}

export function AdminPageHeader({
  titulo,
  descripcion,
  nuevoHref,
  nuevoEtiqueta = 'Nuevo',
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          {titulo}
        </h1>
        {descripcion && (
          <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">{descripcion}</p>
        )}
      </div>
      {nuevoHref && (
        <Link
          href={nuevoHref}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-seguro-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-seguro-600"
        >
          <Plus size={16} aria-hidden="true" />
          {nuevoEtiqueta}
        </Link>
      )}
    </div>
  );
}
