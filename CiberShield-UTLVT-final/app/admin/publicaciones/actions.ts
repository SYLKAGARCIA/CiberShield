'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { publicacionSchema } from '@/lib/validations/publicacion.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsear(formData: FormData) {
  return publicacionSchema.safeParse({
    tipo: formData.get('tipo'),
    titulo: formData.get('titulo'),
    slug: formData.get('slug'),
    resumen: formData.get('resumen') || undefined,
    contenido: formData.get('contenido'),
    categoriaId: formData.get('categoriaId'),
    publicado: formData.get('publicado') === 'on',
    metaTitulo: formData.get('metaTitulo') || undefined,
    metaDescripcion: formData.get('metaDescripcion') || undefined,
  });
}

/** Revalida todas las rutas públicas donde puede aparecer esta publicación. */
function revalidarSitioPublico(tipo: 'ARTICULO' | 'NOTICIA', slug?: string) {
  revalidatePath('/admin/publicaciones');
  revalidatePath('/amenazas');
  revalidatePath('/noticias');
  revalidatePath('/');
  if (slug) {
    revalidatePath(tipo === 'NOTICIA' ? `/noticias/${slug}` : `/articulos/${slug}`);
  }
}

export async function crearPublicacion(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  const usuario = await requerirSesionAdmin();

  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const { categoriaId, publicado, ...datos } = resultado.data;

  try {
    await publicacionRepository.create({
      ...datos,
      publicado,
      publicadoEn: publicado ? new Date() : null,
      categoria: { connect: { id: categoriaId } },
      autor: { connect: { id: usuario.id } },
    });
  } catch {
    return { errorGeneral: 'Ya existe una publicación con ese slug. Elige uno distinto.' };
  }

  revalidarSitioPublico(resultado.data.tipo, resultado.data.slug);
  redirect('/admin/publicaciones');
}

export async function actualizarPublicacion(
  id: string,
  publicadoAntes: boolean,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();

  const resultado = parsear(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const { categoriaId, publicado, ...datos } = resultado.data;

  try {
    await publicacionRepository.update(id, {
      ...datos,
      publicado,
      // Solo se pisa la fecha de publicación la primera vez que pasa a
      // "publicado"; si ya estaba publicada, se conserva la fecha original.
      ...(publicado && !publicadoAntes ? { publicadoEn: new Date() } : {}),
      categoria: { connect: { id: categoriaId } },
    });
  } catch {
    return { errorGeneral: 'No se pudo actualizar. Verifica que el slug no esté en uso.' };
  }

  revalidarSitioPublico(resultado.data.tipo, resultado.data.slug);
  redirect('/admin/publicaciones');
}

export async function eliminarPublicacion(id: string): Promise<void> {
  await requerirSesionAdmin();
  await publicacionRepository.delete(id);
  revalidarSitioPublico('ARTICULO');
  revalidarSitioPublico('NOTICIA');
}
