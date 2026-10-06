import type { Metadata } from 'next';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { PublicacionDetalle } from '@/components/shared/publicacion-detalle';
import { construirMetadata } from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const publicacion = await publicacionRepository.findBySlug(params.slug);
  if (!publicacion) return {};
  return construirMetadata({
    titulo: `${publicacion.metaTitulo ?? publicacion.titulo} | Noticias`,
    descripcion: publicacion.metaDescripcion ?? publicacion.resumen ?? undefined,
    ruta: `/noticias/${params.slug}`,
    tipo: 'article',
  });
}

export default function NoticiaPage({ params }: PageProps) {
  return (
    <PublicacionDetalle
      slug={params.slug}
      tipoEsperado="NOTICIA"
      volverA={{ href: '/noticias', etiqueta: 'Volver a Noticias' }}
    />
  );
}
