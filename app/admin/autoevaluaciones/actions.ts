'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requerirSesionAdmin } from '@/lib/auth';
import { AMENAZAS } from '@/lib/amenazas-data';
import { categoriaRepository } from '@/repository/categoria.repository';
import { preguntaAutoevaluacionRepository } from '@/repository/pregunta-autoevaluacion.repository';
import { preguntaAutoevaluacionSchema } from '@/lib/validations/pregunta-autoevaluacion.schema';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

const RUTA_PREGUNTAS = '/admin/autoevaluaciones/preguntas';

function revalidar() {
  revalidatePath('/admin/autoevaluaciones');
  revalidatePath(RUTA_PREGUNTAS);
  revalidatePath('/autoevaluacion');
}

/** Valida el formulario y comprueba que el módulo y la amenaza existan. */
async function parsear(formData: FormData) {
  const resultado = preguntaAutoevaluacionSchema.safeParse({
    moduloSlug: formData.get('moduloSlug'),
    amenazaSlug: (formData.get('amenazaSlug') as string) || undefined,
    tema: formData.get('tema'),
    titulo: formData.get('titulo'),
    situacion: formData.get('situacion'),
    opciones: formData.getAll('opciones').map(String),
    correcta: formData.get('correcta') ?? undefined,
    explicacion: formData.get('explicacion'),
    activa: formData.get('activa') === 'on',
  });
  if (!resultado.success) return { ok: false as const, estado: { errores: erroresDesdeZod(resultado.error) } };

  const d = resultado.data;
  const categorias = await categoriaRepository.findAll();
  if (!categorias.some((c) => c.slug === d.moduloSlug)) {
    return { ok: false as const, estado: { errores: { moduloSlug: 'El módulo seleccionado no existe' } } };
  }
  if (d.amenazaSlug && !AMENAZAS.some((a) => a.slug === d.amenazaSlug)) {
    return { ok: false as const, estado: { errores: { amenazaSlug: 'La amenaza seleccionada no existe' } } };
  }
  return {
    ok: true as const,
    datos: {
      moduloSlug: d.moduloSlug,
      amenazaSlug: d.amenazaSlug ?? null,
      tema: d.tema,
      titulo: d.titulo,
      situacion: d.situacion,
      opciones: d.opciones,
      correcta: d.correcta,
      explicacion: d.explicacion,
      activa: d.activa,
    },
  };
}

const MENSAJE_DUPLICADA = 'Ya existe una pregunta con esta misma situación en este módulo.';

export async function crearPreguntaAutoevaluacion(_prev: EstadoFormulario, formData: FormData): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const r = await parsear(formData);
  if (!r.ok) return r.estado;
  if (await preguntaAutoevaluacionRepository.existeDuplicada(r.datos.moduloSlug, r.datos.situacion)) {
    return { errores: { situacion: MENSAJE_DUPLICADA } };
  }
  await preguntaAutoevaluacionRepository.crear(r.datos);
  revalidar();
  redirect(RUTA_PREGUNTAS);
}

export async function actualizarPreguntaAutoevaluacion(id: string, _prev: EstadoFormulario, formData: FormData): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const r = await parsear(formData);
  if (!r.ok) return r.estado;
  if (await preguntaAutoevaluacionRepository.existeDuplicada(r.datos.moduloSlug, r.datos.situacion, id)) {
    return { errores: { situacion: MENSAJE_DUPLICADA } };
  }
  try {
    await preguntaAutoevaluacionRepository.actualizar(id, r.datos);
  } catch {
    return { errorGeneral: 'No se encontró la pregunta (puede que otra persona la haya eliminado).' };
  }
  revalidar();
  redirect(RUTA_PREGUNTAS);
}

export async function eliminarPreguntaAutoevaluacion(id: string): Promise<void> {
  await requerirSesionAdmin();
  try {
    await preguntaAutoevaluacionRepository.delete(id);
  } catch {
    throw new Error('No se pudo eliminar (puede que ya no exista).');
  }
  revalidar();
}

export async function cambiarEstadoPreguntaAutoevaluacion(id: string, activa: boolean): Promise<void> {
  await requerirSesionAdmin();
  await preguntaAutoevaluacionRepository.cambiarActiva(id, activa);
  revalidar();
}

export async function moverPreguntaAutoevaluacion(id: string, direccion: 'arriba' | 'abajo'): Promise<void> {
  await requerirSesionAdmin();
  if (direccion !== 'arriba' && direccion !== 'abajo') return;
  await preguntaAutoevaluacionRepository.mover(id, direccion);
  revalidar();
}
