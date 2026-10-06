import { z } from 'zod';

export const menuSchema = z.object({
  etiqueta: z.string().min(1, 'Escribe una etiqueta'),
  url: z.string().min(1, 'Escribe una URL (ej: /amenazas)'),
  ubicacion: z.enum(['HEADER', 'FOOTER'], {
    errorMap: () => ({ message: 'Selecciona una ubicación válida' }),
  }),
  orden: z.coerce.number().int().default(0),
  abrirEnNuevaPestana: z.coerce.boolean().default(false),
});

export type MenuFormValues = z.infer<typeof menuSchema>;
