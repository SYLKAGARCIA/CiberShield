import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoriaRepository } from '@/repository/categoria.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CategoriaForm } from '../../categoria-form';
import { actualizarCategoria } from '../../actions';

export const metadata: Metadata = { title: 'Editar Categoría | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarCategoriaPage({ params }: PageProps) {
  const categoria = await categoriaRepository.findById(params.id);
  if (!categoria) notFound();

  const actualizarConId = actualizarCategoria.bind(null, categoria.id);

  return (
    <div>
      <AdminPageHeader titulo={`Editar: ${categoria.nombre}`} />
      <CategoriaForm accion={actualizarConId} valoresIniciales={categoria} />
    </div>
  );
}
