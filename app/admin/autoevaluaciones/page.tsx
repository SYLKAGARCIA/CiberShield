import type { Metadata } from 'next';
import Link from 'next/link';
import { ListChecks, ExternalLink, AlertTriangle } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { preguntaAutoevaluacionRepository } from '@/repository/pregunta-autoevaluacion.repository';
import { autoevaluacionRepository } from '@/repository/autoevaluacion.repository';
import { categoriaRepository } from '@/repository/categoria.repository';
import { MAX_INTENTOS_FINAL } from '@/lib/autoevaluacion-config';

export const metadata: Metadata = { title: 'Autoevaluaciones | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminAutoevaluacionesPage() {
  const [preguntas, resumen, categorias] = await Promise.all([
    preguntaAutoevaluacionRepository.findAllParaAdmin(),
    autoevaluacionRepository.resumenGlobal(),
    categoriaRepository.findAll(),
  ]);

  const activas = preguntas?.filter((p) => p.activa) ?? [];
  const inactivas = (preguntas?.length ?? 0) - activas.length;
  const slugsModulos = new Set(categorias.map((c) => c.slug));
  const modulosCubiertos = new Set(activas.map((p) => p.moduloSlug).filter((s) => slugsModulos.has(s))).size;

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        titulo="Autoevaluaciones"
        descripcion="Gestiona las preguntas de la autoevaluación que responden los estudiantes. La inicial y la final usan el mismo banco de preguntas."
      />

      {preguntas === null && (
        <div role="alert" className="mb-6 flex gap-3 rounded-lg border border-alerta-500/30 bg-alerta-500/5 p-4 text-sm text-ink-900 dark:text-white">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-alerta-600" aria-hidden="true" />
          <p>
            Falta aplicar la migración de la base de datos (<code>npx prisma migrate deploy</code>). Mientras tanto, los estudiantes ven las preguntas por defecto y no se pueden editar.
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Autoevaluación</th>
              <th className="px-4 py-3 font-medium">Preguntas activas</th>
              <th className="px-4 py-3 font-medium">Inactivas</th>
              <th className="px-4 py-3 font-medium">Módulos cubiertos</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-4">
                <p className="font-medium text-ink-900 dark:text-white">Autoevaluación de la ruta (inicial y final)</p>
                <p className="mt-0.5 text-xs text-ink-700 dark:text-slate-400">
                  Inicial: obligatoria para habilitar los módulos · Final: al terminar todos los módulos ({MAX_INTENTOS_FINAL} intentos)
                </p>
              </td>
              <td className="px-4 py-4 text-ink-700 dark:text-slate-400">{preguntas ? activas.length : '—'}</td>
              <td className="px-4 py-4 text-ink-700 dark:text-slate-400">{preguntas ? inactivas : '—'}</td>
              <td className="px-4 py-4 text-ink-700 dark:text-slate-400">{preguntas ? `${modulosCubiertos} de ${categorias.length}` : '—'}</td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-2">
                  {preguntas && (
                    <Link href="/admin/autoevaluaciones/preguntas" className="inline-flex items-center gap-1.5 rounded-lg bg-seguro-500 px-3 py-2 text-xs font-semibold text-white hover:bg-seguro-600">
                      <ListChecks size={14} aria-hidden="true" /> Gestionar preguntas
                    </Link>
                  )}
                  <Link href="/autoevaluacion" target="_blank" className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-ink-700 hover:border-seguro-500 hover:text-seguro-600 dark:border-slate-700 dark:text-slate-300">
                    <ExternalLink size={13} aria-hidden="true" /> Ver
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {preguntas && activas.length === 0 && (
        <p role="alert" className="mt-4 rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          No hay preguntas activas: los estudiantes no podrán realizar la autoevaluación (ni habilitar los módulos) hasta que actives o crees al menos una.
        </p>
      )}

      {resumen && (
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {[
            { etiqueta: 'Estudiantes con inicial', valor: resumen.conInicial },
            { etiqueta: 'Con inicial y final', valor: resumen.conAmbas },
            { etiqueta: 'Promedio inicial → final', valor: resumen.promedioInicial !== null ? `${resumen.promedioInicial}% → ${resumen.promedioFinal}%` : '—' },
            { etiqueta: 'Mejora promedio', valor: resumen.mejoraPromedio !== null ? `${resumen.mejoraPromedio > 0 ? '+' : ''}${resumen.mejoraPromedio} pts` : '—' },
          ].map((t) => (
            <div key={t.etiqueta} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-surface-dark-elevated">
              <p className="text-xs text-ink-700 dark:text-slate-400">{t.etiqueta}</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink-900 dark:text-white">{t.valor}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
