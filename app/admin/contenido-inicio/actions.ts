'use server';

import { revalidatePath } from 'next/cache';
import { contenidoInicioRepository } from '@/repository/contenido-inicio.repository';
import { contenidoInicioSchema } from '@/lib/validations/contenido-inicio.schema';
import { requerirSesionSuperAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

/**
 * Igual que Configuración: es un registro único (patrón singleton), así
 * que solo hay "actualizar". Se restringe a rol ADMIN: afecta la
 * primera impresión del sitio para todos los visitantes.
 */
export async function actualizarContenidoInicio(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionSuperAdmin();

  const resultado = contenidoInicioSchema.safeParse({
    heroTitulo: formData.get('heroTitulo'),
    heroSubtitulo: formData.get('heroSubtitulo') || '',
    heroImagenUrl: formData.get('heroImagenUrl') || '',
    heroCtaTexto: formData.get('heroCtaTexto') || '',
    heroCtaUrl: formData.get('heroCtaUrl') || '',
  });

  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  // Los campos opcionales vacíos ("") se guardan como null para no
  // romper validaciones de URL en la página pública.
  const datos = Object.fromEntries(
    Object.entries(resultado.data).map(([k, v]) => [k, v === '' ? null : v])
  );

  await contenidoInicioRepository.update(datos);

  revalidatePath('/admin/contenido-inicio');
  revalidatePath('/inicio');
  return {};
}
