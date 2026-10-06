/**
 * Forma estándar del estado que devuelven las Server Actions de
 * formularios del panel administrativo, consumidas con `useFormState`.
 * Centralizado aquí para que ningún feature dependa de los archivos
 * `actions.ts` de otro (evita acoplamiento innecesario entre módulos).
 */
export interface EstadoFormulario {
  errores?: Record<string, string>;
  errorGeneral?: string;
}

export function erroresDesdeZod(error: import('zod').ZodError): Record<string, string> {
  const errores: Record<string, string> = {};
  for (const issue of error.issues) errores[issue.path[0] as string] = issue.message;
  return errores;
}
