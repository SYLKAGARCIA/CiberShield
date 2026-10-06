import { z } from 'zod';

export const MIN_OPCIONES_AUTOEVALUACION = 2;
export const MAX_OPCIONES_AUTOEVALUACION = 6;

/**
 * Pregunta de la Autoevaluación (misma forma que `Escenario`).
 * Las opciones son de 2 a 6 y siempre hay UNA respuesta correcta (la «segura»),
 * porque la autoevaluación del estudiante calcula aciertos y muestra la explicación.
 */
export const preguntaAutoevaluacionSchema = z
  .object({
    moduloSlug: z.string().min(1, 'Selecciona el módulo'),
    amenazaSlug: z.string().optional(),
    tema: z.string().trim().min(2, 'Escribe el tema (ej. Phishing)'),
    titulo: z.string().trim().min(3, 'El título debe tener al menos 3 caracteres'),
    situacion: z.string().trim().min(10, 'Describe la situación (mínimo 10 caracteres)'),
    opciones: z
      .array(z.string().trim().min(1, 'No dejes opciones vacías'))
      .min(MIN_OPCIONES_AUTOEVALUACION, `Agrega al menos ${MIN_OPCIONES_AUTOEVALUACION} opciones`)
      .max(MAX_OPCIONES_AUTOEVALUACION, `Máximo ${MAX_OPCIONES_AUTOEVALUACION} opciones`),
    correcta: z.coerce
      .number({ invalid_type_error: 'Marca cuál opción es la correcta' })
      .int('Marca cuál opción es la correcta')
      .min(0, 'Marca cuál opción es la correcta'),
    explicacion: z.string().trim().min(5, 'Escribe la explicación que verá el estudiante'),
    activa: z.boolean(),
  })
  .refine((d) => d.correcta < d.opciones.length, { message: 'Marca cuál opción es la correcta', path: ['correcta'] })
  .refine((d) => new Set(d.opciones.map((o) => o.toLowerCase())).size === d.opciones.length, {
    message: 'Hay opciones repetidas',
    path: ['opciones'],
  });

export type PreguntaAutoevaluacionValues = z.infer<typeof preguntaAutoevaluacionSchema>;
