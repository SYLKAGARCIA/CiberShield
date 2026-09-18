import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bannerRepository } from '@/repository/banner.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { BannerForm } from '../../banner-form';
import { actualizarBanner } from '../../actions';

export const metadata: Metadata = { title: 'Editar Banner | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarBannerPage({ params }: PageProps) {
  const banner = await bannerRepository.findById(params.id);
  if (!banner) notFound();

  const actualizarConId = actualizarBanner.bind(null, banner.id);

  return (
    <div>
      <AdminPageHeader titulo="Editar banner" />
      <BannerForm accion={actualizarConId} valoresIniciales={banner} />
    </div>
  );
}
