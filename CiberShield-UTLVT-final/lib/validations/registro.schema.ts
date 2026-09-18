import { z } from 'zod';

export const registroSchema = z
  .object({
    name: z.string().min(2, 'Escribe tu nombre completo'),
    email: z.string().email('Escribe un correo electrónico válido'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
      .regex(/[0-9]/, 'Debe incluir al menos un número'),
    confirmarPassword: z.string(),
  })
  .refine((datos) => datos.password === datos.confirmarPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmarPassword'],
  });

export type RegistroFormValues = z.infer<typeof registroSchema>;
