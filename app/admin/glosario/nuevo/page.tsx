import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { GlosarioForm } from '../glosario-form';
import { crearTermino } from '../actions';

export const metadata: Metadata = { title: 'Nuevo Término | Admin' };

export default function NuevoTerminoPage() {
  return (
    <div>
      <AdminPageHeader titulo="Nuevo término" />
      <GlosarioForm accion={crearTermino} />
    </div>
  );
}
