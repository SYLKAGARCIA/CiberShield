import { z } from 'zod';

/**
 * Simplificación deliberada: el formulario del panel admin siempre
 * pide exactamente 4 opciones (cubre la gran mayoría de preguntas de
 * opción múltiple; una pregunta de "verdadero/falso" simplemente usa
 * 2 de las 4). Preguntas de tipo OPCION_MULTIPLE (varias respuestas
 * correctas a la vez) no tienen UI en esta fase — ver pendientes en
 * docs/08-FASE-8.md.
 */
export const preguntaSchema = z.object({
  enunciado: z.string().min(5, 'El enunciado debe tener al menos 5 caracteres'),
  opcion1: z.string().min(1, 'Escribe la opción 1'),
  opcion2: z.string().min(1, 'Escribe la opción 2'),
  opcion3: z.string().min(1, 'Escribe la opción 3'),
  opcion4: z.string().min(1, 'Escribe la opción 4'),
  correcta: z.enum(['1', '2', '3', '4'], {
    errorMap: () => ({ message: 'Selecciona cuál opción es la correcta' }),
  }),
});

export type PreguntaFormValues = z.infer<typeof preguntaSchema>;
