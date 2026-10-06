import { z } from 'zod';

export const recuperarPasswordSchema = z.object({
  email: z.string().email('Escribe un correo electrónico válido'),
});

export type RecuperarPasswordFormValues = z.infer<typeof recuperarPasswordSchema>;
