'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { menuRepository } from '@/repository/menu.repository';
import { menuSchema } from '@/lib/validations/menu.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsear(formData: FormData) {
  return menuSchema.safeParse({
    etiqueta: formData.get('etiqueta'),
    url: formData.get('url'),
    ubicacion: formData.get('ubicacion'),
    orden: formData.get('orden') || 0,
    abrirEnNuevaPestana: formData.get('abrirEnNuevaPestana') === 'on',
  });
}

/** Revalida ambas rutas públicas: el header y el footer consumen este mismo modelo. */
function revalidarSitioPublico() {
  revalidatePath('/admin/menus');
  revalidatePath('/', 'layout'); // Navbar y Footer están en el layout raíz
}

export async function crearItemMenu(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  await menuRepository.create(resultado.data);

  revalidarSitioPublico();
  redirect('/admin/menus');
}

export async function actualizarItemMenu(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  await menuRepository.update(id, resultado.data);

  revalidarSitioPublico();
  redirect('/admin/menus');
}

export async function eliminarItemMenu(id: string): Promise<void> {
  await requerirSesionAdmin();
  await menuRepository.delete(id);
  revalidarSitioPublico();
}
