import { prisma } from '@/lib/prisma';
import { ESCENARIOS, type Escenario } from '@/lib/escenarios-data';

/**
 * Banco de preguntas de la Autoevaluación (tabla `preguntas_autoevaluacion`).
 *  - El panel (/admin/autoevaluaciones) lo gestiona.
 *  - La autoevaluación del estudiante (/autoevaluacion) lee SOLO las activas.
 * Las preguntas iniciales son las de `lib/escenarios-data.ts`, precargadas por la migración.
 */
export interface DatosPreguntaAutoevaluacion {
  moduloSlug: string;
  amenazaSlug: string | null;
  tema: string;
  titulo: string;
  situacion: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
  activa: boolean;
}

type FilaPregunta = Awaited<ReturnType<typeof prisma.preguntaAutoevaluacion.findMany>>[number];

/** Convierte una fila de la BD a la forma `Escenario` que ya usa el quiz del estudiante. */
export function aEscenario(p: FilaPregunta): Escenario {
  return {
    id: p.id,
    moduloSlug: p.moduloSlug,
    amenazaSlug: p.amenazaSlug ?? undefined,
    tema: p.tema,
    titulo: p.titulo,
    situacion: p.situacion,
    opciones: p.opciones,
    correcta: p.correcta,
    explicacion: p.explicacion,
  };
}

class PreguntaAutoevaluacionRepository {
  /**
   * Preguntas que ve el estudiante: activas, en el orden definido por el administrador.
   * Si la tabla aún no existe (migración sin aplicar) se usan las preguntas originales,
   * para que la autoevaluación siga funcionando igual que antes.
   */
  async activasParaEstudiante(): Promise<Escenario[]> {
    try {
      const filas = await prisma.preguntaAutoevaluacion.findMany({
        where: { activa: true },
        orderBy: [{ orden: 'asc' }, { createdAt: 'asc' }],
      });
      return filas.map(aEscenario);
    } catch (e) {
      console.error('No se pudo leer preguntas_autoevaluacion (¿falta aplicar la migración?). Se usan las preguntas por defecto.', e);
      return ESCENARIOS;
    }
  }

  /** Para el panel: todas (activas e inactivas). `null` si la tabla aún no existe. */
  async findAllParaAdmin() {
    try {
      return await prisma.preguntaAutoevaluacion.findMany({ orderBy: [{ orden: 'asc' }, { createdAt: 'asc' }] });
    } catch {
      return null;
    }
  }

  findById(id: string) {
    return prisma.preguntaAutoevaluacion.findUnique({ where: { id } });
  }

  /** ¿Ya existe otra pregunta con la misma situación en el mismo módulo? (evita duplicados) */
  async existeDuplicada(moduloSlug: string, situacion: string, exceptoId?: string) {
    const n = await prisma.preguntaAutoevaluacion.count({
      where: {
        moduloSlug,
        situacion: { equals: situacion.trim(), mode: 'insensitive' },
        ...(exceptoId ? { id: { not: exceptoId } } : {}),
      },
    });
    return n > 0;
  }

  /** Crea la pregunta al final de su módulo. */
  async crear(data: DatosPreguntaAutoevaluacion) {
    const max = await prisma.preguntaAutoevaluacion.aggregate({ _max: { orden: true } });
    return prisma.preguntaAutoevaluacion.create({ data: { ...data, orden: (max._max.orden ?? 0) + 1 } });
  }

  actualizar(id: string, data: DatosPreguntaAutoevaluacion) {
    return prisma.preguntaAutoevaluacion.update({ where: { id }, data });
  }

  cambiarActiva(id: string, activa: boolean) {
    return prisma.preguntaAutoevaluacion.update({ where: { id }, data: { activa } });
  }

  delete(id: string) {
    return prisma.preguntaAutoevaluacion.delete({ where: { id } });
  }

  /**
   * Sube o baja una pregunta dentro de su módulo intercambiando su `orden` con la vecina.
   * Antes renumera el módulo (1..n global) para que no haya empates de orden.
   */
  async mover(id: string, direccion: 'arriba' | 'abajo') {
    await prisma.$transaction(async (tx) => {
      const todas = await tx.preguntaAutoevaluacion.findMany({ orderBy: [{ orden: 'asc' }, { createdAt: 'asc' }] });
      // Renumerar si hay empates o huecos, para que el intercambio sea siempre válido.
      const necesitaRenumerar = todas.some((p, i) => p.orden !== i + 1);
      if (necesitaRenumerar) {
        for (let i = 0; i < todas.length; i++) {
          if (todas[i].orden !== i + 1) await tx.preguntaAutoevaluacion.update({ where: { id: todas[i].id }, data: { orden: i + 1 } });
          todas[i] = { ...todas[i], orden: i + 1 };
        }
      }
      const actual = todas.find((p) => p.id === id);
      if (!actual) return;
      const delModulo = todas.filter((p) => p.moduloSlug === actual.moduloSlug);
      const pos = delModulo.findIndex((p) => p.id === id);
      const vecina = delModulo[direccion === 'arriba' ? pos - 1 : pos + 1];
      if (!vecina) return;
      await tx.preguntaAutoevaluacion.update({ where: { id: actual.id }, data: { orden: vecina.orden } });
      await tx.preguntaAutoevaluacion.update({ where: { id: vecina.id }, data: { orden: actual.orden } });
    });
  }
}

export const preguntaAutoevaluacionRepository = new PreguntaAutoevaluacionRepository();
