export const CLASIFICACIONES = [
  { valor: 'NACIONAL', etiqueta: 'Nacionales', singular: 'Nacional' },
  { valor: 'INTERNACIONAL', etiqueta: 'Internacionales', singular: 'Internacional' },
  { valor: 'ALERTA', etiqueta: 'Alertas', singular: 'Alerta' },
  { valor: 'TENDENCIA', etiqueta: 'Tendencias', singular: 'Tendencia' },
] as const;

export function etiquetaClasificacion(valor?: string | null) {
  return CLASIFICACIONES.find((c) => c.valor === valor)?.singular ?? null;
}
