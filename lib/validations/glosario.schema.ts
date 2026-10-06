import { z } from 'zod';

export const glosarioSchema = z.object({
  termino: z.string().min(2, 'El término debe tener al menos 2 caracteres'),
  definicion: z.string().min(10, 'La definición debe tener al menos 10 caracteres'),
});

export type GlosarioFormValues = z.infer<typeof glosarioSchema>;
