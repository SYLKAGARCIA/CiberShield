import type { Categoria } from '@prisma/client';
import { CategoryCard } from '@/components/shared/category-card';
import { Reveal } from '@/components/shared/reveal';

interface CategoryGridProps {
  categorias: Categoria[];
}

export function CategoryGrid({ categorias }: CategoryGridProps) {
  if (categorias.length === 0) return null;

  return (
    <section aria-labelledby="categorias-titulo" className="mx-auto max-w-6xl px-6 pb-20 pt-16">
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="mt-1.5 h-8 w-1 shrink-0 rounded-full bg-primary-500" />
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300">
            Temas
          </span>
          <h2
            id="categorias-titulo"
            className="mt-1 font-display text-3xl font-semibold text-ink-900 dark:text-white"
          >
            Lo que necesitas reconocer
          </h2>
          <p className="mt-3 text-ink-700 dark:text-slate-400">
            Cada categoría reúne explicaciones claras, ejemplos reales y
            recomendaciones prácticas.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {categorias.map((categoria, i) => (
          <Reveal key={categoria.id} delay={i * 60}>
            <CategoryCard categoria={categoria} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
