import { z } from 'zod';

export const publicacionSchema = z.object({
  tipo: z.enum(['ARTICULO', 'NOTICIA'], {
    errorMap: () => ({ message: 'Selecciona un tipo válido' }),
  }),
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  slug: z
    .string()
    .min(3, 'El slug debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Solo minúsculas, números y guiones'),
  resumen: z.string().max(300).optional(),
  contenido: z.string().min(20, 'El contenido debe tener al menos 20 caracteres'),
  categoriaId: z.string().min(1, 'Selecciona una categoría'),
  publicado: z.coerce.boolean().default(false),
  metaTitulo: z.string().optional(),
  metaDescripcion: z.string().optional(),
});

export type PublicacionFormValues = z.infer<typeof publicacionSchema>;
