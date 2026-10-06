import { redirect } from 'next/navigation';
import { categoriaRepository } from '@/repository/categoria.repository';
import { progresoRepository } from '@/repository/progreso.repository';
import { resultadoEvaluacionRepository } from '@/repository/resultado-evaluacion.repository';
import { autoevaluacionRepository, compararIntentos } from '@/repository/autoevaluacion.repository';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { ordenarModulos } from '@/lib/modulos-data';
import { tieneAccesoAdmin } from '@/lib/auth';

/**
 * Ruta de aprendizaje del estudiante:
 *   1) Autoevaluación INICIAL (obligatoria para ver los módulos)
 *   2) Módulos, cada uno con su evaluación aprobada
 *   3) Autoevaluación FINAL (se habilita al terminar TODO lo anterior)
 */
export interface PasoModulo { slug: string; nombre: string; completado: boolean; evaluacionId: string | null; evaluacionAprobada: boolean }

export async function estadoRuta(usuario: { id: string; role: { name: string } } | null) {
  const esAdmin = !!usuario && tieneAccesoAdmin(usuario.role.name);
  if (!usuario) {
    return { esAdmin, tieneInicial: false, tieneFinal: false, listoParaFinal: false, pasos: [] as PasoModulo[], intentos: [] as Awaited<ReturnType<typeof autoevaluacionRepository.intentosDeUsuario>>, completos: 0, intentosFinal: 0 };
  }
  const [categorias, progreso, resultados, intentos] = await Promise.all([
    categoriaRepository.findAll(),
    progresoRepository.completadosPorUsuario(usuario.id),
    resultadoEvaluacionRepository.findPorUsuario(usuario.id),
    autoevaluacionRepository.intentosDeUsuario(usuario.id),
  ]);
  const hechos = new Set(progreso.map((p) => p.categoriaId));
  const aprobadas = new Set(resultados.filter((r) => r.aprobado).map((r) => r.evaluacionId));

  const pasos: PasoModulo[] = [];
  for (const c of ordenarModulos<{ id: string; slug: string; nombre: string }>(categorias)) {
    const ev = await evaluacionRepository.findById(`evaluacion-${c.slug}`);
    const evaluacionId = ev?.activa ? ev.id : null;
    pasos.push({
      slug: c.slug,
      nombre: c.nombre,
      completado: hechos.has(c.id),
      evaluacionId,
      // Si el módulo no tiene evaluación, no se exige.
      evaluacionAprobada: evaluacionId ? aprobadas.has(evaluacionId) : true,
    });
  }
  const { inicial, final } = compararIntentos(intentos);
  const completos = pasos.filter((p) => p.completado && p.evaluacionAprobada).length;
  return {
    esAdmin,
    tieneInicial: !!inicial,
    tieneFinal: !!final,
    listoParaFinal: pasos.length > 0 && completos === pasos.length,
    pasos,
    intentos,
    completos,
    intentosFinal: intentos.filter((i) => i.tipo === 'FINAL').length,
  };
}

/** Guard de las páginas de módulos: sin autoevaluación inicial no se pueden ver (el admin sí). */
export async function requerirAutoevaluacionInicial(usuario: { id: string; role: { name: string } } | null) {
  if (usuario && tieneAccesoAdmin(usuario.role.name)) return;
  if (!usuario) redirect('/autoevaluacion?requerida=1');
  const intentos = await autoevaluacionRepository.intentosDeUsuario(usuario.id);
  if (!intentos.some((i) => i.tipo === 'INICIAL')) redirect('/autoevaluacion?requerida=1');
}
