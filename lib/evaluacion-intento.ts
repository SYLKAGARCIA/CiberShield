/**
 * Cada intento de evaluación muestra un conjunto DISTINTO de preguntas, en
 * distinto orden y con las opciones mezcladas.
 *
 * - La página genera una `semilla` aleatoria y la envía en un campo oculto.
 * - Al calificar, el servidor recalcula exactamente la misma selección a
 *   partir de la semilla (no confía en qué preguntas dice el cliente).
 * - Si el banco tiene más preguntas que PREGUNTAS_POR_INTENTO, se elige un
 *   subconjunto al azar; si no, se usan todas (solo cambia el orden).
 *   Para más variedad basta agregar preguntas a la evaluación en el admin.
 */
export const PREGUNTAS_POR_INTENTO = 8;

function hash(texto: string) {
  let h = 1779033703 ^ texto.length;
  for (let i = 0; i < texto.length; i++) {
    h = Math.imul(h ^ texto.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function barajar<T>(lista: T[], semilla: string): T[] {
  const rnd = mulberry32(hash(semilla));
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function nuevaSemilla() {
  return Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
}

export function semillaValida(s: unknown): s is string {
  return typeof s === 'string' && /^[a-z0-9]{6,40}$/.test(s);
}

export function prepararIntento<P extends { id: string; opciones: { id: string }[] }>(preguntas: P[], semilla: string): P[] {
  return barajar(preguntas, `${semilla}:preguntas`)
    .slice(0, PREGUNTAS_POR_INTENTO)
    .map((p) => ({ ...p, opciones: barajar(p.opciones, `${semilla}:${p.id}`) }));
}
