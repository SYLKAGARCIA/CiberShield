'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { recursoRepository } from '@/repository/recurso.repository';
import { recursoSchema } from '@/lib/validations/recurso.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsear(formData: FormData) {
  return recursoSchema.safeParse({
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion') || undefined,
    tipo: formData.get('tipo'),
    url: formData.get('url'),
    categoriaId: formData.get('categoriaId') || undefined,
  });
}

export async function crearRecurso(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const { categoriaId, ...datos } = resultado.data;
  await recursoRepository.create({
    ...datos,
    ...(categoriaId ? { categoria: { connect: { id: categoriaId } } } : {}),
  });

  revalidatePath('/admin/recursos');
  revalidatePath('/recursos');
  redirect('/admin/recursos');
}

export async function actualizarRecurso(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const { categoriaId, ...datos } = resultado.data;
  await recursoRepository.update(id, {
    ...datos,
    categoria: categoriaId ? { connect: { id: categoriaId } } : { disconnect: true },
  });

  revalidatePath('/admin/recursos');
  revalidatePath('/recursos');
  redirect('/admin/recursos');
}

export async function eliminarRecurso(id: string): Promise<void> {
  await requerirSesionAdmin();
  await recursoRepository.delete(id);
  revalidatePath('/admin/recursos');
  revalidatePath('/recursos');
}
