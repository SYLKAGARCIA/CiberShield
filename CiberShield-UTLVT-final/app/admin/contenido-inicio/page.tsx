import type { Metadata } from 'next';
import { contenidoInicioRepository } from '@/repository/contenido-inicio.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ContenidoInicioForm } from './contenido-inicio-form';

export const metadata: Metadata = { title: 'Contenido de Inicio | Admin' };

export default async function AdminContenidoInicioPage() {
  const contenido = await contenidoInicioRepository.get();

  return (
    <div>
      <AdminPageHeader
        titulo="Contenido de Inicio"
        descripcion="El título, subtítulo y botón principal que ve cualquier visitante en /inicio."
      />
      <ContenidoInicioForm
        valoresIniciales={
          contenido ?? { heroTitulo: 'Aprende a protegerte en el mundo digital' }
        }
      />
    </div>
  );
}
