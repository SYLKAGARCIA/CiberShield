import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { MenuForm } from '../menu-form';
import { crearItemMenu } from '../actions';

export const metadata: Metadata = { title: 'Nuevo Ítem de Menú | Admin' };

export default function NuevoItemMenuPage() {
  return (
    <div>
      <AdminPageHeader titulo="Nuevo ítem de menú" />
      <MenuForm accion={crearItemMenu} />
    </div>
  );
}
