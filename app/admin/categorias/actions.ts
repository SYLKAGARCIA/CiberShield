'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { categoriaRepository } from '@/repository/categoria.repository';
import { categoriaSchema } from '@/lib/validations/categoria.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsearFormulario(formData: FormData) {
  return categoriaSchema.safeParse({
    nombre: formData.get('nombre'),
    slug: formData.get('slug'),
    descripcion: formData.get('descripcion') || undefined,
  });
}

export async function crearCategoria(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();

  const resultado = parsearFormulario(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  try {
    await categoriaRepository.create(resultado.data);
  } catch {
    return { errorGeneral: 'Ya existe una categoría con ese slug. Elige uno distinto.' };
  }

  revalidatePath('/admin/categorias');
  revalidatePath('/amenazas');
  redirect('/admin/categorias');
}

export async function actualizarCategoria(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();

  const resultado = parsearFormulario(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  try {
    await categoriaRepository.update(id, resultado.data);
  } catch {
    return { errorGeneral: 'No se pudo actualizar. Verifica que el slug no esté en uso.' };
  }

  revalidatePath('/admin/categorias');
  revalidatePath('/amenazas');
  redirect('/admin/categorias');
}

export async function eliminarCategoria(id: string): Promise<void> {
  await requerirSesionAdmin();
  try {
    await categoriaRepository.delete(id);
  } catch {
    throw new Error(
      'No se puede eliminar: hay artículos, noticias o recursos que usan esta categoría.'
    );
  }
  revalidatePath('/admin/categorias');
  revalidatePath('/amenazas');
}
