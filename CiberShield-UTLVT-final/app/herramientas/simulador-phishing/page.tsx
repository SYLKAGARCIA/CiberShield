import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { PhishingSimulator } from '@/components/tools/phishing-simulator';

export const metadata: Metadata = { title: 'Simulador de Phishing' };

export default function SimuladorPhishingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Herramienta"
        titulo="Simulador de phishing"
        descripcion="Revisa cada correo y decide si es un intento de phishing o un mensaje legítimo."
      />
      <div className="mx-auto max-w-xl px-6 pb-24 pt-10">
        <PhishingSimulator />
      </div>
    </>
  );
}
