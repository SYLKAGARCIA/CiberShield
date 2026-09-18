import type { Metadata } from 'next';
import { categoriaRepository } from '@/repository/categoria.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { PublicacionForm } from '../publicacion-form';
import { crearPublicacion } from '../actions';

export const metadata: Metadata = { title: 'Nueva Publicación | Admin' };

export default async function NuevaPublicacionPage() {
  const categorias = await categoriaRepository.findAll();

  return (
    <div>
      <AdminPageHeader titulo="Nueva publicación" />
      <PublicacionForm accion={crearPublicacion} categorias={categorias} />
    </div>
  );
}
