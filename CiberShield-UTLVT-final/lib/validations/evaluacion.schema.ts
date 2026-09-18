import { z } from 'zod';

export const evaluacionSchema = z.object({
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  descripcion: z.string().max(300).optional(),
  puntajeMinimo: z.coerce.number().int().min(1).max(100).default(70),
  activa: z.coerce.boolean().default(true),
});

export type EvaluacionFormValues = z.infer<typeof evaluacionSchema>;
