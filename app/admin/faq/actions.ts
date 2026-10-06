'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { faqRepository } from '@/repository/faq.repository';
import { faqSchema } from '@/lib/validations/faq.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsear(formData: FormData) {
  return faqSchema.safeParse({
    pregunta: formData.get('pregunta'),
    respuesta: formData.get('respuesta'),
    orden: formData.get('orden') || 0,
    publicada: formData.get('publicada') === 'on',
  });
}

export async function crearFaq(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  await faqRepository.create(resultado.data);

  revalidatePath('/admin/faq');
  revalidatePath('/faq');
  redirect('/admin/faq');
}

export async function actualizarFaq(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  await faqRepository.update(id, resultado.data);

  revalidatePath('/admin/faq');
  revalidatePath('/faq');
  redirect('/admin/faq');
}

export async function eliminarFaq(id: string): Promise<void> {
  await requerirSesionAdmin();
  await faqRepository.delete(id);
  revalidatePath('/admin/faq');
  revalidatePath('/faq');
}
