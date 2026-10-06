import { z } from 'zod';

export const recursoSchema = z.object({
  titulo: z.string().min(2, 'El título debe tener al menos 2 caracteres'),
  descripcion: z.string().max(300).optional(),
  tipo: z.enum(['PDF', 'VIDEO', 'ENLACE', 'IMAGEN'], {
    errorMap: () => ({ message: 'Selecciona un tipo válido' }),
  }),
  url: z.string().url('Debe ser una URL válida (ej: https://...)'),
  categoriaId: z.string().optional(),
});

export type RecursoFormValues = z.infer<typeof recursoSchema>;
