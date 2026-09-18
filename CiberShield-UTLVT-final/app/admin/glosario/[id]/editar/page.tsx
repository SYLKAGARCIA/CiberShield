import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { glosarioRepository } from '@/repository/glosario.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { GlosarioForm } from '../../glosario-form';
import { actualizarTermino } from '../../actions';

export const metadata: Metadata = { title: 'Editar Término | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarTerminoPage({ params }: PageProps) {
  const termino = await glosarioRepository.findById(params.id);
  if (!termino) notFound();

  const actualizarConId = actualizarTermino.bind(null, termino.id);

  return (
    <div>
      <AdminPageHeader titulo={`Editar: ${termino.termino}`} />
      <GlosarioForm accion={actualizarConId} valoresIniciales={termino} />
    </div>
  );
}
