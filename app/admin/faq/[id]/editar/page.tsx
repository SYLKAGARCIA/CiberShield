import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { faqRepository } from '@/repository/faq.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { FaqForm } from '../../faq-form';
import { actualizarFaq } from '../../actions';

export const metadata: Metadata = { title: 'Editar Pregunta | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function EditarFaqPage({ params }: PageProps) {
  const pregunta = await faqRepository.findById(params.id);
  if (!pregunta) notFound();

  const actualizarConId = actualizarFaq.bind(null, pregunta.id);

  return (
    <div>
      <AdminPageHeader titulo="Editar pregunta" />
      <FaqForm accion={actualizarConId} valoresIniciales={pregunta} />
    </div>
  );
}
