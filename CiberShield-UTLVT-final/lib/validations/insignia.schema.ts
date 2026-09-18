import { z } from 'zod';

export const insigniaSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(60, 'El nombre no puede superar los 60 caracteres'),
  descripcion: z.string().max(300).optional(),
  // Un emoji corto (ej: 🛡️, 🏆, 🔒) que se muestra como ícono de la insignia.
  // Es opcional: si se deja vacío, se usa un ícono genérico por defecto.
  icono: z.string().max(10).optional(),
  // Texto libre que le explica al admin (y opcionalmente al estudiante)
  // cómo se obtiene esta insignia. Por ahora es solo informativo: el
  // otorgamiento real se hace desde repository.otorgar(), a mano o
  // conectado a una regla concreta más adelante.
  criterio: z.string().max(300).optional(),
});

export type InsigniaFormValues = z.infer<typeof insigniaSchema>;
