import { z } from 'zod';

export const contactoSchema = z.object({
  nombre: z.string().min(2, 'Escribe tu nombre completo'),
  email: z.string().email('Escribe un correo electrónico válido'),
  asunto: z.string().min(3, 'Escribe un asunto breve'),
  mensaje: z.string().min(10, 'Cuéntanos un poco más (mínimo 10 caracteres)'),
});

export type ContactoFormValues = z.infer<typeof contactoSchema>;
