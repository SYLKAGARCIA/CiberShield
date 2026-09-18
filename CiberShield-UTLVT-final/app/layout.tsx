import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PublicShell } from '@/components/layout/public-shell';
import { ServiceWorkerRegistrar } from '@/components/pwa/service-worker-registrar';
import { CiberShieldChatbot } from '@/components/chatbot/cybershield-chatbot';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { fontDisplay, fontBody, fontMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F9FB' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1220' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body>
        <ThemeProvider>
          {/* Accesibilidad: permite a usuarios de teclado saltar
              directamente al contenido, sin tabular por todo el
              Navbar en cada página. Visualmente oculto hasta que
              recibe foco. */}
          <a
            href="#contenido-principal"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-seguro-500 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
          >
            Saltar al contenido principal
          </a>
          <Navbar />
          <main id="contenido-principal">
            <PublicShell>{children}</PublicShell>
          </main>
          <Footer />
          <ServiceWorkerRegistrar />
          <CiberShieldChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
