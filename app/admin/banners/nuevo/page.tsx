import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { BannerForm } from '../banner-form';
import { crearBanner } from '../actions';

export const metadata: Metadata = { title: 'Nuevo Banner | Admin' };

export default function NuevoBannerPage() {
  return (
    <div>
      <AdminPageHeader titulo="Nuevo banner" />
      <BannerForm accion={crearBanner} />
    </div>
  );
}
