import type { Metadata } from 'next';
import { glosarioRepository } from '@/repository/glosario.repository';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Glosario',
  descripcion: 'Términos clave de ciberseguridad explicados en lenguaje simple.',
  ruta: '/glosario',
});

export default async function GlosarioPage() {
  const terminos = await glosarioRepository.findAll();

  const agrupados = terminos.reduce<Record<string, typeof terminos>>((acc, termino) => {
    const letra = termino.letra.toUpperCase();
    acc[letra] = acc[letra] ? [...acc[letra], termino] : [termino];
    return acc;
  }, {});

  const letras = Object.keys(agrupados).sort();

  return (
    <>
      <PageHeader
        eyebrow="Glosario"
        titulo="El vocabulario de la seguridad digital"
        descripcion="Términos técnicos explicados sin jerga innecesaria."
      />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        {terminos.length === 0 ? (
          <EmptyState
            titulo="El glosario todavía está vacío"
            descripcion="El administrador aún no agregó términos."
          />
        ) : (
          <>
            <nav
              aria-label="Índice alfabético"
              className="mb-10 flex flex-wrap gap-1.5 border-b border-slate-200 pb-6 dark:border-slate-800"
            >
              {letras.map((letra) => (
                <a
                  key={letra}
                  href={`#letra-${letra}`}
                  className="flex h-8 w-8 items-center justify-center rounded-md font-mono text-sm font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-surface-dark-elevated"
                >
                  {letra}
                </a>
              ))}
            </nav>

            <div className="space-y-10">
              {letras.map((letra) => (
                <section key={letra} id={`letra-${letra}`}>
                  <h2 className="font-display text-xl font-semibold text-primary-600 dark:text-primary-300">
                    {letra}
                  </h2>
                  <dl className="mt-4 space-y-5">
                    {agrupados[letra].map((termino) => (
                      <div key={termino.id}>
                        <dt className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                          {termino.termino}
                        </dt>
                        <dd className="mt-1 leading-relaxed text-ink-700 dark:text-slate-400">
                          {termino.definicion}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
