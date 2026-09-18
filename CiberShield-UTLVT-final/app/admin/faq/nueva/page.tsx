import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { FaqForm } from '../faq-form';
import { crearFaq } from '../actions';

export const metadata: Metadata = { title: 'Nueva Pregunta | Admin' };

export default function NuevaFaqPage() {
  return (
    <div>
      <AdminPageHeader titulo="Nueva pregunta frecuente" />
      <FaqForm accion={crearFaq} />
    </div>
  );
}
