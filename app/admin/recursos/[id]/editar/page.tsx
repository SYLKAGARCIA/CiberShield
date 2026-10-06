import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { recursoRepository } from '@/repository/recurso.repository';
import { categoriaRepository } from '@/repository/categoria.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { RecursoForm } from '../../recurso-form';
import { actualizarRecurso } from '../../actions';

export const metadata: Metadata = { title: 'Editar Recurso | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarRecursoPage({ params }: PageProps) {
  const [recurso, categorias] = await Promise.all([
    recursoRepository.findById(params.id),
    categoriaRepository.findAll(),
  ]);
  if (!recurso) notFound();

  const actualizarConId = actualizarRecurso.bind(null, recurso.id);

  return (
    <div>
      <AdminPageHeader titulo={`Editar: ${recurso.titulo}`} />
      <RecursoForm accion={actualizarConId} categorias={categorias} valoresIniciales={recurso} />
    </div>
  );
}
