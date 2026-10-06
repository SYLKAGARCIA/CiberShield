import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { certificadoRepository } from '@/repository/certificado.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';

export const metadata: Metadata = { title: 'Certificados | Admin' };

export default async function AdminCertificadosPage() {
  const certificados = await certificadoRepository.findAllParaAdmin();

  return (
    <div>
      <AdminPageHeader
        titulo="Certificados emitidos"
        descripcion="Listado de solo lectura. Se generan automáticamente al aprobar una evaluación."
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Estudiante</th>
              <th className="px-4 py-3 font-medium">Evaluación</th>
              <th className="px-4 py-3 font-medium">Puntaje</th>
              <th className="px-4 py-3 font-medium">Emitido</th>
              <th className="px-4 py-3 font-medium text-right">Código</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {certificados.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  Todavía no se ha emitido ningún certificado.
                </td>
              </tr>
            ) : (
              certificados.map((certificado) => (
                <tr key={certificado.id}>
                  <td className="px-4 py-3 font-medium text-ink-900 dark:text-white">
                    {certificado.usuario.name}
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">
                    {certificado.resultado.evaluacion.titulo}
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">
                    {certificado.resultado.puntaje}%
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">
                    {certificado.emitidoEn.toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/certificados/${certificado.codigo}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 font-mono text-xs text-primary-600 hover:underline dark:text-primary-300"
                    >
                      {certificado.codigo.slice(0, 10)}...
                      <ExternalLink size={11} aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
