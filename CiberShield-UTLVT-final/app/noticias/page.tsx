import type { Metadata } from 'next';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { PageHeader } from '@/components/shared/page-header';
import { ArticleCard } from '@/components/shared/article-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Noticias',
  descripcion: 'Últimas noticias sobre ciberseguridad relevantes para estudiantes.',
  ruta: '/noticias',
});

export default async function NoticiasPage() {
  const noticias = await publicacionRepository.findPublicadas('NOTICIA');

  return (
    <>
      <PageHeader
        eyebrow="Noticias"
        titulo="Lo que está pasando en ciberseguridad"
        descripcion="Casos reales y actualizaciones relevantes para la comunidad estudiantil."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {noticias.length === 0 ? (
          <EmptyState
            titulo="Todavía no hay noticias publicadas"
            descripcion="El equipo editorial publicará novedades próximamente."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((noticia, i) => (
              <Reveal key={noticia.id} delay={i * 60}>
                <ArticleCard publicacion={noticia} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
