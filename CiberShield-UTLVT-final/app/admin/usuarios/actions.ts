'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { usuarioRepository } from '@/repository/usuario.repository';
import { usuarioSchema, usuarioEditSchema } from '@/lib/validations/usuario.schema';
import { requerirSesionSuperAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

const SALT_ROUNDS = 10;

export async function crearUsuario(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionSuperAdmin();

  const resultado = usuarioSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    roleId: formData.get('roleId'),
  });
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const passwordHash = await bcrypt.hash(resultado.data.password, SALT_ROUNDS);

  try {
    await usuarioRepository.create({
      name: resultado.data.name,
      email: resultado.data.email,
      passwordHash,
      role: { connect: { id: resultado.data.roleId } },
    });
  } catch {
    return { errorGeneral: 'Ya existe un usuario con ese correo electrónico.' };
  }

  revalidatePath('/admin/usuarios');
  redirect('/admin/usuarios');
}

export async function actualizarUsuario(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionSuperAdmin();

  const resultado = usuarioEditSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password') || undefined,
    roleId: formData.get('roleId'),
    active: formData.get('active') === 'on',
  });
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const { password, roleId, ...datos } = resultado.data;

  try {
    await usuarioRepository.update(id, {
      ...datos,
      role: { connect: { id: roleId } },
      ...(password ? { passwordHash: await bcrypt.hash(password, SALT_ROUNDS) } : {}),
    });
  } catch {
    return { errorGeneral: 'No se pudo actualizar. Verifica que el correo no esté en uso.' };
  }

  revalidatePath('/admin/usuarios');
  redirect('/admin/usuarios');
}

export async function eliminarUsuario(id: string): Promise<void> {
  const sesionActual = await requerirSesionSuperAdmin();

  if (sesionActual.id === id) {
    throw new Error('No puedes eliminar tu propio usuario mientras tienes sesión activa.');
  }

  try {
    await usuarioRepository.delete(id);
  } catch {
    throw new Error(
      'No se puede eliminar: este usuario tiene contenido asociado (publicaciones, resultados, etc.).'
    );
  }

  revalidatePath('/admin/usuarios');
}
