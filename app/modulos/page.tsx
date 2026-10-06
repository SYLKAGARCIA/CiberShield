import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Sparkles } from 'lucide-react';
import { categoriaRepository } from '@/repository/categoria.repository';
import { progresoRepository } from '@/repository/progreso.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { ordenarModulos } from '@/lib/modulos-data';
import { ModuloCard } from '@/components/modulos/modulo-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';
import { requerirAutoevaluacionInicial } from '@/lib/ruta-estado';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = construirMetadata({
  titulo: 'Módulos',
  descripcion: 'Recorre los módulos de CiberShield UTLVT: pequeñas unidades para aprender ciberseguridad paso a paso.',
  ruta: '/modulos',
});

export default async function ModulosPage() {
  const [categorias, usuario] = await Promise.all([categoriaRepository.findAllConConteos(), obtenerSesionActual()]);
  await requerirAutoevaluacionInicial(usuario);
  const modulos = ordenarModulos(categorias);
  const completados = usuario ? new Set((await progresoRepository.completadosPorUsuario(usuario.id)).map((p) => p.categoriaId)) : new Set<string>();
  const hechos = modulos.filter((m) => completados.has(m.id)).length;
  const pct = modulos.length ? Math.round((hechos / modulos.length) * 100) : 0;

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white dark:border-slate-800">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest backdrop-blur"><GraduationCap size={14} aria-hidden="true" />Ruta de aprendizaje</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">Módulos de ciberseguridad</h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-100">Cada módulo es un mini curso: lee, mira los recursos, practica con una actividad y marca tu avance.</p>
          {usuario ? (
            <div className="mt-6 max-w-md">
              <div className="mb-1.5 flex justify-between text-sm"><span>Tu progreso</span><span className="font-semibold">{hechos} de {modulos.length} módulos</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-seguro-400 transition-all duration-700" style={{ width: `${pct}%` }} /></div>
            </div>
          ) : (
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-primary-100"><Sparkles size={15} aria-hidden="true" /><Link href="/login" className="font-semibold underline">Inicia sesión</Link> para guardar tu progreso.</p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {modulos.length === 0 ? (
          <EmptyState titulo="Todavía no hay módulos cargados" descripcion="El administrador aún no publicó contenido en esta sección." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modulos.map((m, i) => (
              <Reveal key={m.id} delay={i * 60}>
                <ModuloCard indice={i} slug={m.slug} nombre={m.nombre} descripcion={m.descripcion} lecciones={m._count.publicaciones} recursos={m._count.recursos} completado={completados.has(m.id)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
