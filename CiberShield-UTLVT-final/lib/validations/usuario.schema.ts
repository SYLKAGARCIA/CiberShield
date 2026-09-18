import { z } from 'zod';

export const usuarioSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  // La contraseña en texto plano solo se usa en el formulario;
  // el repositorio/servicio se encarga de convertirla a passwordHash.
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
    .regex(/[0-9]/, 'Debe incluir al menos un número'),
  roleId: z.string().min(1, 'Debes seleccionar un rol'),
});

export type UsuarioFormValues = z.infer<typeof usuarioSchema>;

/**
 * Esquema para editar un usuario existente: la contraseña es opcional
 * (dejar el campo vacío significa "no cambiar la contraseña actual").
 * Si se proporciona, debe cumplir las mismas reglas de complejidad.
 */
export const usuarioEditSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z
    .union([
      z.literal(''),
      z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
        .regex(/[0-9]/, 'Debe incluir al menos un número'),
    ])
    .optional(),
  roleId: z.string().min(1, 'Debes seleccionar un rol'),
  active: z.coerce.boolean().default(true),
});

export type UsuarioEditFormValues = z.infer<typeof usuarioEditSchema>;
