import { z } from 'zod';

export const contenidoInicioSchema = z.object({
  heroTitulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  heroSubtitulo: z.string().max(300).optional().or(z.literal('')),
  heroImagenUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  heroCtaTexto: z.string().max(40).optional().or(z.literal('')),
  heroCtaUrl: z.string().optional().or(z.literal('')),
});

export type ContenidoInicioFormValues = z.infer<typeof contenidoInicioSchema>;
