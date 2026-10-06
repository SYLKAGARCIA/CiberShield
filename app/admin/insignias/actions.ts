'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insigniaRepository } from '@/repository/insignia.repository';
import { insigniaSchema } from '@/lib/validations/insignia.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsear(formData: FormData) {
  return insigniaSchema.safeParse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion') || undefined,
    icono: formData.get('icono') || undefined,
    criterio: formData.get('criterio') || undefined,
  });
}

export async function crearInsignia(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  try {
    await insigniaRepository.create(resultado.data);
  } catch {
    return { errorGeneral: 'Ya existe una insignia con ese nombre.' };
  }

  revalidatePath('/admin/insignias');
  redirect('/admin/insignias');
}

export async function actualizarInsignia(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  try {
    await insigniaRepository.update(id, resultado.data);
  } catch {
    return { errorGeneral: 'No se pudo actualizar la insignia.' };
  }

  revalidatePath('/admin/insignias');
  redirect('/admin/insignias');
}

export async function eliminarInsignia(id: string): Promise<void> {
  await requerirSesionAdmin();
  await insigniaRepository.delete(id);
  revalidatePath('/admin/insignias');
}
