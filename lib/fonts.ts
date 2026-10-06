import { Sora, Inter, JetBrains_Mono } from 'next/font/google';

// Titulares: geométrica, firme y confiable — la nueva identidad de
// CiberShield UTLVT. Distinta deliberadamente de la tipografía de
// titulares anterior (Space Grotesk) para que el rediseño se sienta
// como una versión genuinamente nueva, no un simple recoloreo.
export const fontDisplay = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Cuerpo de texto: máxima legibilidad para contenido educativo extenso.
// Se conserva Inter (ya cumplía bien esta función).
export const fontBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Utilitaria: códigos de certificado, badges, indicadores técnicos.
export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});
