import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { menuRepository } from '@/repository/menu.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { MenuForm } from '../../menu-form';
import { actualizarItemMenu } from '../../actions';

export const metadata: Metadata = { title: 'Editar Ítem de Menú | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarItemMenuPage({ params }: PageProps) {
  const item = await menuRepository.findById(params.id);
  if (!item) notFound();

  const actualizarConId = actualizarItemMenu.bind(null, item.id);

  return (
    <div>
      <AdminPageHeader titulo={`Editar: ${item.etiqueta}`} />
      <MenuForm accion={actualizarConId} valoresIniciales={item} />
    </div>
  );
}
