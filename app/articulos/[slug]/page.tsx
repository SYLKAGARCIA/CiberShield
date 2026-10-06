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
    titulo: publicacion.metaTitulo ?? publicacion.titulo,
    descripcion: publicacion.metaDescripcion ?? publicacion.resumen ?? undefined,
    ruta: `/articulos/${params.slug}`,
    tipo: 'article',
  });
}

export default function ArticuloPage({ params }: PageProps) {
  return (
    <PublicacionDetalle
      slug={params.slug}
      tipoEsperado="ARTICULO"
      volverA={{ href: '/amenazas', etiqueta: 'Volver a Amenazas' }}
    />
  );
}
