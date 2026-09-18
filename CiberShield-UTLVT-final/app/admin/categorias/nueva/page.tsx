import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CategoriaForm } from '../categoria-form';
import { crearCategoria } from '../actions';

export const metadata: Metadata = { title: 'Nueva Categoría | Admin' };

export default function NuevaCategoriaPage() {
  return (
    <div>
      <AdminPageHeader titulo="Nueva categoría" />
      <CategoriaForm accion={crearCategoria} />
    </div>
  );
}
