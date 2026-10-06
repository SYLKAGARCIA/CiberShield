import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Escribe un correo electrónico válido'),
  // Sin reglas de complejidad aquí: esas se validan al crear la cuenta
  // (ver usuarioSchema), no en el login — un login solo verifica que
  // el campo no esté vacío.
  password: z.string().min(1, 'Escribe tu contraseña'),
  recordarme: z.boolean().optional().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
