'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { bannerRepository } from '@/repository/banner.repository';
import { bannerSchema } from '@/lib/validations/banner.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsear(formData: FormData) {
  return bannerSchema.safeParse({
    grupo: formData.get('grupo') || 'home-hero',
    titulo: formData.get('titulo') || '',
    subtitulo: formData.get('subtitulo') || '',
    imagenUrl: formData.get('imagenUrl'),
    enlaceUrl: formData.get('enlaceUrl') || '',
    orden: formData.get('orden') || 0,
    activo: formData.get('activo') === 'on',
    fechaInicio: formData.get('fechaInicio') || '',
    fechaFin: formData.get('fechaFin') || '',
  });
}

/** Convierte los campos "" (string vacío) a null, y las fechas de texto a Date. */
function prepararDatos(data: ReturnType<typeof bannerSchema.parse>) {
  return {
    grupo: data.grupo,
    titulo: data.titulo || null,
    subtitulo: data.subtitulo || null,
    imagenUrl: data.imagenUrl,
    enlaceUrl: data.enlaceUrl || null,
    orden: data.orden,
    activo: data.activo,
    fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : null,
    fechaFin: data.fechaFin ? new Date(data.fechaFin) : null,
  };
}

export async function crearBanner(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  await bannerRepository.create(prepararDatos(resultado.data));

  revalidatePath('/admin/banners');
  revalidatePath('/inicio');
  redirect('/admin/banners');
}

export async function actualizarBanner(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  await bannerRepository.update(id, prepararDatos(resultado.data));

  revalidatePath('/admin/banners');
  revalidatePath('/inicio');
  redirect('/admin/banners');
}

export async function eliminarBanner(id: string): Promise<void> {
  await requerirSesionAdmin();
  await bannerRepository.delete(id);
  revalidatePath('/admin/banners');
  revalidatePath('/inicio');
}
