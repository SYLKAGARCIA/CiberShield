'use server';

import { revalidatePath } from 'next/cache';
import { configuracionRepository } from '@/repository/configuracion.repository';
import { configuracionSchema } from '@/lib/validations/configuracion.schema';
import { requerirSesionSuperAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

/**
 * A diferencia del resto de entidades, la Configuración es un registro
 * único (patrón singleton, ver decisión técnica en docs/02-FASE-2.md),
 * así que solo existe "actualizar" — no hay crear ni eliminar. Se
 * restringe a rol ADMIN (no EDITOR): afecta metadatos globales del sitio.
 */
export async function actualizarConfiguracion(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionSuperAdmin();

  const resultado = configuracionSchema.safeParse({
    nombreSitio: formData.get('nombreSitio'),
    descripcionSitio: formData.get('descripcionSitio') || undefined,
    emailContacto: formData.get('emailContacto') || '',
    telefonoContacto: formData.get('telefonoContacto') || undefined,
    facebookUrl: formData.get('facebookUrl') || '',
    twitterUrl: formData.get('twitterUrl') || '',
    instagramUrl: formData.get('instagramUrl') || '',
    linkedinUrl: formData.get('linkedinUrl') || '',
    metaTituloDefault: formData.get('metaTituloDefault') || undefined,
    metaDescripcionDefault: formData.get('metaDescripcionDefault') || undefined,
  });

  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  // Los campos "" (string vacío) de URLs opcionales se guardan como
  // null en vez de "" para no romper validaciones de URL en el sitio público.
  const datos = Object.fromEntries(
    Object.entries(resultado.data).map(([k, v]) => [k, v === '' ? null : v])
  );

  await configuracionRepository.update(datos);

  revalidatePath('/admin/configuracion');
  revalidatePath('/', 'layout');

  return {};
}
