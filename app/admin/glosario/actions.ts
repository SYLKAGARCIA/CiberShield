'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { glosarioRepository } from '@/repository/glosario.repository';
import { glosarioSchema } from '@/lib/validations/glosario.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsear(formData: FormData) {
  return glosarioSchema.safeParse({
    termino: formData.get('termino'),
    definicion: formData.get('definicion'),
  });
}

export async function crearTermino(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  try {
    await glosarioRepository.create({
      ...resultado.data,
      letra: resultado.data.termino.charAt(0).toUpperCase(),
    });
  } catch {
    return { errorGeneral: 'Ya existe un término con ese nombre.' };
  }

  revalidatePath('/admin/glosario');
  revalidatePath('/glosario');
  redirect('/admin/glosario');
}

export async function actualizarTermino(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  try {
    await glosarioRepository.update(id, {
      ...resultado.data,
      letra: resultado.data.termino.charAt(0).toUpperCase(),
    });
  } catch {
    return { errorGeneral: 'No se pudo actualizar el término.' };
  }

  revalidatePath('/admin/glosario');
  revalidatePath('/glosario');
  redirect('/admin/glosario');
}

export async function eliminarTermino(id: string): Promise<void> {
  await requerirSesionAdmin();
  await glosarioRepository.delete(id);
  revalidatePath('/admin/glosario');
  revalidatePath('/glosario');
}
