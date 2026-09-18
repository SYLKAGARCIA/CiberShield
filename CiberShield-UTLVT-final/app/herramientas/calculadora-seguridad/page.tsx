import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { SecurityCalculator } from '@/components/tools/security-calculator';

export const metadata: Metadata = { title: 'Calculadora de Seguridad' };

export default function CalculadoraSeguridadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Herramienta"
        titulo="Calculadora de seguridad digital"
        descripcion="Responde con honestidad para obtener recomendaciones útiles, no un examen."
      />
      <div className="mx-auto max-w-xl px-6 pb-24 pt-10">
        <SecurityCalculator />
      </div>
    </>
  );
}
