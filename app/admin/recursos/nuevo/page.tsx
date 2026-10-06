import type { Metadata } from 'next';
import { categoriaRepository } from '@/repository/categoria.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { RecursoForm } from '../recurso-form';
import { crearRecurso } from '../actions';

export const metadata: Metadata = { title: 'Nuevo Recurso | Admin' };

export default async function NuevoRecursoPage() {
  const categorias = await categoriaRepository.findAll();

  return (
    <div>
      <AdminPageHeader titulo="Nuevo recurso" />
      <RecursoForm accion={crearRecurso} categorias={categorias} />
    </div>
  );
}
