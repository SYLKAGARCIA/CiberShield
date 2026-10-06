import { z } from 'zod';

export const faqSchema = z.object({
  pregunta: z.string().min(5, 'La pregunta debe tener al menos 5 caracteres'),
  respuesta: z.string().min(10, 'La respuesta debe tener al menos 10 caracteres'),
  categoria: z.string().optional(),
  orden: z.coerce.number().int().default(0),
  publicada: z.coerce.boolean().default(true),
});

export type FaqFormValues = z.infer<typeof faqSchema>;
