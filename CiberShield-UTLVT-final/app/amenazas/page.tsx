import type { Metadata } from 'next';
import { categoriaRepository } from '@/repository/categoria.repository';
import { PageHeader } from '@/components/shared/page-header';
import { CategoryCard } from '@/components/shared/category-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Amenazas',
  descripcion: 'Conoce las amenazas digitales más comunes: phishing, malware, ingeniería social y más.',
  ruta: '/amenazas',
});

export default async function AmenazasPage() {
  const categorias = await categoriaRepository.findAll();

  return (
    <>
      <PageHeader
        eyebrow="Amenazas"
        titulo="Reconoce el riesgo antes de que te alcance"
        descripcion="Cada categoría explica cómo actúa la amenaza, ejemplos reales y cómo protegerte."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {categorias.length === 0 ? (
          <EmptyState
            titulo="Todavía no hay categorías cargadas"
            descripcion="El administrador aún no publicó contenido en esta sección."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categorias.map((categoria, i) => (
              <Reveal key={categoria.id} delay={i * 60}>
                <CategoryCard categoria={categoria} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
