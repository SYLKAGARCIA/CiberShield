import { z } from 'zod';

export const categoriaSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede superar los 80 caracteres'),
  slug: z
    .string()
    .min(2, 'El slug debe tener al menos 2 caracteres')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'El slug solo puede contener minúsculas, números y guiones (ej: "buenas-practicas")'
    ),
  descripcion: z.string().max(300).optional(),
});

export type CategoriaFormValues = z.infer<typeof categoriaSchema>;
