import type { Metadata } from 'next';
import { configuracionRepository } from '@/repository/configuracion.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ConfiguracionForm } from './configuracion-form';

export const metadata: Metadata = { title: 'Configuración | Admin' };

export default async function AdminConfiguracionPage() {
  const configuracion = await configuracionRepository.get();

  return (
    <div>
      <AdminPageHeader
        titulo="Configuración general"
        descripcion="Datos globales del sitio: nombre, contacto, redes sociales y SEO por defecto."
      />
      <ConfiguracionForm
        valoresIniciales={
          configuracion ?? {
            nombreSitio: 'CiberShield UTLVT',
          }
        }
      />
    </div>
  );
}
