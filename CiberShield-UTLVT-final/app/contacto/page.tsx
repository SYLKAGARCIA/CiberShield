import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { ContactForm } from '@/components/contact/contact-form';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Contacto',
  descripcion: 'Escríbenos tus dudas o comentarios sobre el proyecto.',
  ruta: '/contacto',
});

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        titulo="¿Tienes una duda o sugerencia?"
        descripcion="Completa el formulario y te responderemos a la brevedad."
      />

      <div className="mx-auto max-w-xl px-6 pb-24 pt-10">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-surface-dark-elevated">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
