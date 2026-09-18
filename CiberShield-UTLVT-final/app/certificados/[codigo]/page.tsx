import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShieldCheck, Download, Calendar, User, Award } from 'lucide-react';
import { certificadoRepository } from '@/repository/certificado.repository';

export const metadata: Metadata = { title: 'Verificar Certificado' };

interface PageProps {
  params: { codigo: string };
}

export default async function VerificarCertificadoPage({ params }: PageProps) {
  const certificado = await certificadoRepository.findByCodigo(params.codigo);
  if (!certificado) notFound();

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-seguro-500/10">
        <ShieldCheck className="text-seguro-500" size={30} aria-hidden="true" />
      </div>

      <h1 className="mt-6 font-display text-2xl font-semibold text-ink-900 dark:text-white">
        Certificado válido
      </h1>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-seguro-600 dark:text-seguro-400">
        Código: {certificado.codigo}
      </p>

      <div className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 text-left dark:border-slate-800 dark:bg-surface-dark-elevated">
        <div className="flex items-center gap-3">
          <User size={16} className="shrink-0 text-primary-500" aria-hidden="true" />
          <div>
            <p className="text-xs text-ink-700/60 dark:text-slate-500">Otorgado a</p>
            <p className="font-medium text-ink-900 dark:text-white">{certificado.usuario.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Award size={16} className="shrink-0 text-primary-500" aria-hidden="true" />
          <div>
            <p className="text-xs text-ink-700/60 dark:text-slate-500">Evaluación</p>
            <p className="font-medium text-ink-900 dark:text-white">
              {certificado.resultado.evaluacion.titulo}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar size={16} className="shrink-0 text-primary-500" aria-hidden="true" />
          <div>
            <p className="text-xs text-ink-700/60 dark:text-slate-500">Fecha de emisión</p>
            <p className="font-medium text-ink-900 dark:text-white">
              {certificado.emitidoEn.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {certificado.archivoPdfUrl && (
        <a
          href={certificado.archivoPdfUrl}
          download
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          <Download size={15} aria-hidden="true" />
          Descargar PDF
        </a>
      )}
    </div>
  );
}
