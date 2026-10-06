import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { categoriaRepository } from '@/repository/categoria.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { PublicacionForm } from '../../publicacion-form';
import { actualizarPublicacion } from '../../actions';

export const metadata: Metadata = { title: 'Editar Publicación | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarPublicacionPage({ params }: PageProps) {
  const [publicacion, categorias] = await Promise.all([
    publicacionRepository.findById(params.id),
    categoriaRepository.findAll(),
  ]);
  if (!publicacion) notFound();

  const actualizarConId = actualizarPublicacion.bind(null, publicacion.id, publicacion.publicado);

  return (
    <div>
      <AdminPageHeader titulo={`Editar: ${publicacion.titulo}`} />
      <PublicacionForm accion={actualizarConId} categorias={categorias} valoresIniciales={publicacion} />
    </div>
  );
}
