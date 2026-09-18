import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { SecurityChecklist } from '@/components/tools/security-checklist';

export const metadata: Metadata = { title: 'Checklist de Seguridad' };

export default function ChecklistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Herramienta"
        titulo="Checklist de seguridad digital"
        descripcion="Marca cada hábito a medida que lo apliques en tu vida real."
      />
      <div className="mx-auto max-w-xl px-6 pb-24 pt-10">
        <SecurityChecklist />
      </div>
    </>
  );
}
