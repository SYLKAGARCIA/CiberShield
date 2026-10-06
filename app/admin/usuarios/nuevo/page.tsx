import type { Metadata } from 'next';
import { roleRepository } from '@/repository/role.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { UsuarioForm } from '../usuario-form';
import { crearUsuario } from '../actions';

export const metadata: Metadata = { title: 'Nuevo Usuario | Admin' };

export default async function NuevoUsuarioPage() {
  const roles = await roleRepository.findAll();

  return (
    <div>
      <AdminPageHeader titulo="Nuevo usuario" />
      <UsuarioForm accion={crearUsuario} roles={roles} modo="crear" />
    </div>
  );
}
