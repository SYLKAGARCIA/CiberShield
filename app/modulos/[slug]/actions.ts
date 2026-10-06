'use server';

import { revalidatePath } from 'next/cache';
import { obtenerSesionActual } from '@/lib/auth';
import { otorgarInsigniasPorProgreso } from '@/lib/insignias-auto';
import { progresoRepository } from '@/repository/progreso.repository';

/** Marca o desmarca un módulo como completado para el estudiante con sesión. */
export async function alternarModuloCompletado(categoriaId: string, slug: string, completar: boolean) {
  const usuario = await obtenerSesionActual();
  if (!usuario) return { ok: false as const, error: 'Inicia sesión para guardar tu progreso.' };

  let insignias: string[] = [];
  try {
    if (completar) await progresoRepository.marcar(usuario.id, categoriaId);
    else await progresoRepository.desmarcar(usuario.id, categoriaId);
  } catch {
    return { ok: false as const, error: 'No se pudo guardar el progreso. Intenta de nuevo.' };
  }

  if (completar) insignias = await otorgarInsigniasPorProgreso(usuario.id, categoriaId);

  revalidatePath(`/modulos/${slug}`);
  revalidatePath('/modulos');
  revalidatePath('/mi-progreso');
  revalidatePath('/inicio');
  return { ok: true as const, insignias };
}
