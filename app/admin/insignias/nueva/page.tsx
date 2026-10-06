import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { InsigniaForm } from '../insignia-form';
import { crearInsignia } from '../actions';

export const metadata: Metadata = { title: 'Nueva Insignia | Admin' };

export default function NuevaInsigniaPage() {
  return (
    <div>
      <AdminPageHeader titulo="Nueva insignia" />
      <InsigniaForm accion={crearInsignia} />
    </div>
  );
}
