'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { obtenerSesionActual, tieneAccesoAdmin } from '@/lib/auth';
import { foroRepository } from '@/repository/foro.repository';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

const hiloSchema = z.object({
  titulo: z.string().trim().min(5, 'El título debe tener al menos 5 caracteres').max(150, 'Máximo 150 caracteres'),
  contenido: z.string().trim().min(10, 'Escribe al menos 10 caracteres').max(3000, 'Máximo 3000 caracteres'),
});
const respuestaSchema = z.object({
  contenido: z.string().trim().min(2, 'Escribe tu respuesta').max(2000, 'Máximo 2000 caracteres'),
});

export async function crearHilo(_prev: EstadoFormulario, formData: FormData): Promise<EstadoFormulario> {
  const usuario = await obtenerSesionActual();
  if (!usuario) return { errorGeneral: 'Debes iniciar sesión para publicar en el foro.' };

  const r = hiloSchema.safeParse({ titulo: formData.get('titulo'), contenido: formData.get('contenido') });
  if (!r.success) return { errores: erroresDesdeZod(r.error) };

  let id: string;
  try {
    const hilo = await foroRepository.crearHilo(usuario.id, r.data.titulo, r.data.contenido);
    id = hilo.id;
  } catch {
    return { errorGeneral: 'No se pudo publicar. Intenta de nuevo.' };
  }
  revalidatePath('/foro');
  redirect(`/foro/${id}`);
}

export async function responderHilo(hiloId: string, _prev: EstadoFormulario, formData: FormData): Promise<EstadoFormulario> {
  const usuario = await obtenerSesionActual();
  if (!usuario) return { errorGeneral: 'Debes iniciar sesión para responder.' };

  const r = respuestaSchema.safeParse({ contenido: formData.get('contenido') });
  if (!r.success) return { errores: erroresDesdeZod(r.error) };

  try {
    await foroRepository.crearRespuesta(usuario.id, hiloId, r.data.contenido);
  } catch {
    return { errorGeneral: 'No se pudo publicar la respuesta.' };
  }
  revalidatePath(`/foro/${hiloId}`);
  revalidatePath('/foro');
  return {};
}

/** Autor del contenido o personal (ADMIN/EDITOR) pueden eliminar. */
export async function eliminarHilo(hiloId: string) {
  const usuario = await obtenerSesionActual();
  if (!usuario) return;
  const autorId = await autorDeHilo(hiloId);
  if (autorId !== usuario.id && !tieneAccesoAdmin(usuario.role.name)) return;
  await foroRepository.eliminarHilo(hiloId);
  revalidatePath('/foro');
  redirect('/foro');
}

export async function eliminarRespuesta(respuestaId: string, hiloId: string) {
  const usuario = await obtenerSesionActual();
  if (!usuario) return;
  const autorId = await autorDeRespuesta(respuestaId);
  if (autorId !== usuario.id && !tieneAccesoAdmin(usuario.role.name)) return;
  await foroRepository.eliminarRespuesta(respuestaId);
  revalidatePath(`/foro/${hiloId}`);
}

async function autorDeHilo(id: string) {
  const { prisma } = await import('@/lib/prisma');
  return (await prisma.foroHilo.findUnique({ where: { id }, select: { autorId: true } }))?.autorId;
}
async function autorDeRespuesta(id: string) {
  const { prisma } = await import('@/lib/prisma');
  return (await prisma.foroRespuesta.findUnique({ where: { id }, select: { autorId: true } }))?.autorId;
}
