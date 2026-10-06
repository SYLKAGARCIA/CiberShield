import type { Metadata } from 'next';
import { faqRepository } from '@/repository/faq.repository';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { JsonLd } from '@/components/shared/json-ld';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Preguntas Frecuentes',
  descripcion: 'Respuestas rápidas a las dudas más comunes sobre seguridad digital.',
  ruta: '/faq',
});

export default async function FaqPage() {
  const preguntas = await faqRepository.findPublicadas();

  return (
    <>
      {preguntas.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: preguntas.map((p) => ({
              '@type': 'Question',
              name: p.pregunta,
              acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
            })),
          }}
        />
      )}
      <PageHeader
        eyebrow="Ayuda"
        titulo="Preguntas Frecuentes"
        descripcion="¿No encuentras tu duda aquí? Escríbenos desde la sección de Contacto."
      />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        {preguntas.length === 0 ? (
          <EmptyState
            titulo="Todavía no hay preguntas cargadas"
            descripcion="Vuelve pronto: estamos preparando esta sección."
          />
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {preguntas.map((pregunta) => (
              <details key={pregunta.id} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-semibold text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-white">
                  {pregunta.pregunta}
                  <span
                    aria-hidden="true"
                    className="ml-4 shrink-0 text-primary-500 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-700 dark:text-slate-400">
                  {pregunta.respuesta}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
