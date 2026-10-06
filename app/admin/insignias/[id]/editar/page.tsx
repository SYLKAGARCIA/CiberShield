import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { insigniaRepository } from '@/repository/insignia.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { InsigniaForm } from '../../insignia-form';
import { actualizarInsignia } from '../../actions';

export const metadata: Metadata = { title: 'Editar Insignia | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarInsigniaPage({ params }: PageProps) {
  const insignia = await insigniaRepository.findById(params.id);
  if (!insignia) notFound();

  const actualizarConId = actualizarInsignia.bind(null, insignia.id);

  return (
    <div>
      <AdminPageHeader titulo={`Editar: ${insignia.nombre}`} />
      <InsigniaForm accion={actualizarConId} valoresIniciales={insignia} />
    </div>
  );
}
