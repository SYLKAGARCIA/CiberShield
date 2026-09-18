interface PageHeaderProps {
  eyebrow: string;
  titulo: string;
  descripcion?: string;
}

/**
 * Encabezado compartido por casi todas las páginas de contenido.
 * Rediseñado de un layout centrado genérico a uno alineado a la
 * izquierda con una barra de acento vertical y una rejilla de puntos
 * de fondo, para que se sienta como el panel de una plataforma técnica
 * en vez de una landing page genérica.
 */
export function PageHeader({ eyebrow, titulo, descripcion }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-surface-dark-elevated/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-500/[0.04] dark:text-primary-300/[0.05]"
      />
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-1.5 h-10 w-1 shrink-0 rounded-full bg-seguro-500"
          />
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300">
              {eyebrow}
            </span>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-white md:text-4xl">
              {titulo}
            </h1>
            {descripcion && (
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-700 dark:text-slate-400">
                {descripcion}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
