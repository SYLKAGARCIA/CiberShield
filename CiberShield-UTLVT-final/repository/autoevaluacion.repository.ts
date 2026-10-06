import { prisma } from '@/lib/prisma';

export interface DetalleModulo { slug: string; ok: number; total: number }

/** Lecturas tolerantes: si la migración aún no se aplicó, el sitio sigue funcionando. */
class AutoevaluacionRepository {
  async intentosDeUsuario(usuarioId: string) {
    try {
      return await prisma.intentoAutoevaluacion.findMany({ where: { usuarioId }, orderBy: { createdAt: 'asc' } });
    } catch {
      return [];
    }
  }

  /** Para el admin: cuántos estudiantes tienen inicial y final y cuánto mejoraron en promedio. */
  async resumenGlobal() {
    try {
      const todos = await prisma.intentoAutoevaluacion.findMany({ orderBy: { createdAt: 'asc' } });
      const porUsuario = new Map<string, typeof todos>();
      for (const i of todos) porUsuario.set(i.usuarioId, [...(porUsuario.get(i.usuarioId) ?? []), i]);
      const mejoras: number[] = [];
      let iniciales = 0;
      let sumaIni = 0;
      let sumaFin = 0;
      for (const lista of Array.from(porUsuario.values())) {
        const { inicial, final } = compararIntentos(lista);
        if (inicial) iniciales++;
        if (inicial && final) { mejoras.push(final.porcentaje - inicial.porcentaje); sumaIni += inicial.porcentaje; sumaFin += final.porcentaje; }
      }
      const n = mejoras.length;
      return {
        conInicial: iniciales,
        conAmbas: n,
        promedioInicial: n ? Math.round(sumaIni / n) : null,
        promedioFinal: n ? Math.round(sumaFin / n) : null,
        mejoraPromedio: n ? Math.round(mejoras.reduce((a, b) => a + b, 0) / n) : null,
      };
    } catch {
      return null;
    }
  }

  crear(data: { usuarioId: string; tipo: string; aciertos: number; total: number; porcentaje: number; detalle: DetalleModulo[] }) {
    return prisma.intentoAutoevaluacion.create({ data: { ...data, detalle: JSON.stringify(data.detalle) } });
  }
}

export const autoevaluacionRepository = new AutoevaluacionRepository();

/**
 * Compara la autoevaluación INICIAL (el primer intento, línea base) con la FINAL
 * (el MEJOR de sus intentos; si hay empate, el más reciente).
 */
export function compararIntentos<T extends { tipo: string; porcentaje: number; detalle: string; createdAt: Date }>(intentos: T[]) {
  const inicial = intentos.find((i) => i.tipo === 'INICIAL') ?? null;
  const finales = intentos.filter((i) => i.tipo === 'FINAL');
  const final = finales.reduce<T | null>((mejor, i) => (!mejor || i.porcentaje >= mejor.porcentaje ? i : mejor), null);
  return { inicial, final, mejora: inicial && final ? final.porcentaje - inicial.porcentaje : null };
}
