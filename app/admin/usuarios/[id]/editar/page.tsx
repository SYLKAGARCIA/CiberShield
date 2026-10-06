import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { usuarioRepository } from '@/repository/usuario.repository';
import { roleRepository } from '@/repository/role.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { UsuarioForm } from '../../usuario-form';
import { actualizarUsuario } from '../../actions';

export const metadata: Metadata = { title: 'Editar Usuario | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarUsuarioPage({ params }: PageProps) {
  const [usuario, roles] = await Promise.all([
    usuarioRepository.findById(params.id),
    roleRepository.findAll(),
  ]);
  if (!usuario) notFound();

  const actualizarConId = actualizarUsuario.bind(null, usuario.id);

  return (
    <div>
      <AdminPageHeader titulo={`Editar: ${usuario.name}`} />
      <UsuarioForm
        accion={actualizarConId}
        roles={roles}
        modo="editar"
        valoresIniciales={{
          name: usuario.name,
          email: usuario.email,
          roleId: usuario.roleId,
          active: usuario.active,
        }}
      />
    </div>
  );
}
