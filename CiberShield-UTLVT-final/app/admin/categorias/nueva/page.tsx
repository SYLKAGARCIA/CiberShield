import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CategoriaForm } from '../categoria-form';
import { crearCategoria } from '../actions';

export const metadata: Metadata = { title: 'Nuevo Módulo | Admin' };

export default function NuevaCategoriaPage() {
  return (
    <div>
      <AdminPageHeader titulo="Nuevo módulo" />
      <CategoriaForm accion={crearCategoria} />
    </div>
  );
}
