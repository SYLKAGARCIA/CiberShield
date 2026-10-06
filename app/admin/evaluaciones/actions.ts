'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { preguntaRepository } from '@/repository/pregunta.repository';
import { evaluacionSchema } from '@/lib/validations/evaluacion.schema';
import { preguntaSchema } from '@/lib/validations/pregunta.schema';
import { requerirSesionAdmin } from '@/lib/auth';
import { erroresDesdeZod, type EstadoFormulario } from '@/types/admin-form';

function parsearEvaluacion(formData: FormData) {
  return evaluacionSchema.safeParse({
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion') || undefined,
    puntajeMinimo: formData.get('puntajeMinimo') || 70,
    activa: formData.get('activa') === 'on',
  });
}

export async function crearEvaluacion(
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsearEvaluacion(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const evaluacion = await evaluacionRepository.create(resultado.data);

  revalidatePath('/admin/evaluaciones');
  revalidatePath('/evaluaciones');
  redirect(`/admin/evaluaciones/${evaluacion.id}`);
}

export async function actualizarEvaluacion(
  id: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsearEvaluacion(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  await evaluacionRepository.update(id, resultado.data);

  revalidatePath('/admin/evaluaciones');
  revalidatePath(`/admin/evaluaciones/${id}`);
  revalidatePath('/evaluaciones');
  return {};
}

export async function eliminarEvaluacion(id: string): Promise<void> {
  await requerirSesionAdmin();
  try {
    await evaluacionRepository.delete(id);
  } catch {
    throw new Error('No se puede eliminar: ya existen resultados registrados para esta evaluación.');
  }
  revalidatePath('/admin/evaluaciones');
  revalidatePath('/evaluaciones');
}

function parsearPregunta(formData: FormData) {
  return preguntaSchema.safeParse({
    enunciado: formData.get('enunciado'),
    opcion1: formData.get('opcion1'),
    opcion2: formData.get('opcion2'),
    opcion3: formData.get('opcion3'),
    opcion4: formData.get('opcion4'),
    correcta: formData.get('correcta'),
  });
}

export async function crearPregunta(
  evaluacionId: string,
  ordenSiguiente: number,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsearPregunta(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const { enunciado, correcta, ...opcionesTexto } = resultado.data;

  await preguntaRepository.crearConOpciones({
    evaluacionId,
    enunciado,
    orden: ordenSiguiente,
    opciones: [
      { texto: opcionesTexto.opcion1, esCorrecta: correcta === '1', orden: 1 },
      { texto: opcionesTexto.opcion2, esCorrecta: correcta === '2', orden: 2 },
      { texto: opcionesTexto.opcion3, esCorrecta: correcta === '3', orden: 3 },
      { texto: opcionesTexto.opcion4, esCorrecta: correcta === '4', orden: 4 },
    ],
  });

  revalidatePath(`/admin/evaluaciones/${evaluacionId}`);
  redirect(`/admin/evaluaciones/${evaluacionId}`);
}

export async function actualizarPregunta(
  evaluacionId: string,
  preguntaId: string,
  _prevState: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await requerirSesionAdmin();
  const resultado = parsearPregunta(formData);
  if (!resultado.success) return { errores: erroresDesdeZod(resultado.error) };

  const { enunciado, correcta, ...opcionesTexto } = resultado.data;

  await preguntaRepository.actualizarConOpciones(preguntaId, {
    enunciado,
    opciones: [
      { texto: opcionesTexto.opcion1, esCorrecta: correcta === '1', orden: 1 },
      { texto: opcionesTexto.opcion2, esCorrecta: correcta === '2', orden: 2 },
      { texto: opcionesTexto.opcion3, esCorrecta: correcta === '3', orden: 3 },
      { texto: opcionesTexto.opcion4, esCorrecta: correcta === '4', orden: 4 },
    ],
  });

  revalidatePath(`/admin/evaluaciones/${evaluacionId}`);
  redirect(`/admin/evaluaciones/${evaluacionId}`);
}

export async function eliminarPregunta(evaluacionId: string, id: string): Promise<void> {
  await requerirSesionAdmin();
  await preguntaRepository.delete(id);
  revalidatePath(`/admin/evaluaciones/${evaluacionId}`);
}
