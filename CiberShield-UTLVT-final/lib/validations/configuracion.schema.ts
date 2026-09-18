import { z } from 'zod';

export const configuracionSchema = z.object({
  nombreSitio: z.string().min(2, 'Escribe el nombre del sitio'),
  descripcionSitio: z.string().max(300).optional(),
  emailContacto: z.string().email('Debe ser un correo válido').optional().or(z.literal('')),
  telefonoContacto: z.string().optional(),
  facebookUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  metaTituloDefault: z.string().optional(),
  metaDescripcionDefault: z.string().optional(),
});

export type ConfiguracionFormValues = z.infer<typeof configuracionSchema>;
