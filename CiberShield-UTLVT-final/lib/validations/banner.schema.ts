import { z } from 'zod';

export const bannerSchema = z.object({
  grupo: z.string().min(1, 'Escribe un grupo (ej: home-hero)'),
  titulo: z.string().max(120).optional().or(z.literal('')),
  subtitulo: z.string().max(200).optional().or(z.literal('')),
  imagenUrl: z.string().url('Debe ser una URL válida'),
  enlaceUrl: z.string().optional().or(z.literal('')),
  orden: z.coerce.number().int().default(0),
  activo: z.boolean().default(true),
  fechaInicio: z.string().optional().or(z.literal('')),
  fechaFin: z.string().optional().or(z.literal('')),
});

export type BannerFormValues = z.infer<typeof bannerSchema>;
