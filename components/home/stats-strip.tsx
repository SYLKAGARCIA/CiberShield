import { FolderTree, Newspaper, Library, BookMarked, type LucideIcon } from 'lucide-react';

interface Stat {
  valor: number;
  etiqueta: string;
}

/** Un ícono por estadística, en el mismo orden en que las arma app/inicio/page.tsx. */
const ICONOS: LucideIcon[] = [FolderTree, Newspaper, Library, BookMarked];

/**
 * Muestra conteos reales tomados de la base de datos (categorías,
 * artículos publicados, recursos, términos de glosario), con el mismo
 * estilo de tarjeta que las del dashboard de admin.
 */
export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Estadísticas de la plataforma"
    >
      {stats.map((stat, i) => {
        const Icono = ICONOS[i] ?? FolderTree;
        return (
          <div
            key={stat.etiqueta}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-surface-dark-elevated"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
              <Icono size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
                {stat.valor}
              </p>
              <p className="text-sm text-ink-700 dark:text-slate-400">{stat.etiqueta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
