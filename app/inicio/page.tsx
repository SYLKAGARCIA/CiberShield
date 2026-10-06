import type { Metadata } from 'next';
import { bannerRepository } from '@/repository/banner.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { categoriaRepository } from '@/repository/categoria.repository';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { recursoRepository } from '@/repository/recurso.repository';
import { glosarioRepository } from '@/repository/glosario.repository';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, GraduationCap, ClipboardCheck, Lightbulb, ShieldAlert, Newspaper, Library, CheckCircle2, MessagesSquare } from 'lucide-react';
import { estadoRuta } from '@/lib/ruta-estado';
import { progresoRepository } from '@/repository/progreso.repository';
import { ordenarModulos } from '@/lib/modulos-data';
import { AMENAZAS } from '@/lib/amenazas-data';
import { ModuloCard } from '@/components/modulos/modulo-card';
import { ThreatCard } from '@/components/shared/threat-card';
import { NoticiaCard } from '@/components/noticias/noticia-card';
import { SobreCiberseguridad } from '@/components/home/sobre-ciberseguridad';
import { StatsStrip } from '@/components/home/stats-strip';
import { BannerCarousel } from '@/components/home/banner-carousel';
import { Reveal } from '@/components/shared/reveal';
import { JsonLd } from '@/components/shared/json-ld';
import { construirMetadata } from '@/lib/seo';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = construirMetadata({
  titulo: SITE_NAME,
  descripcion: SITE_DESCRIPTION,
  ruta: '/inicio',
});

export const dynamic = 'force-dynamic';

const CONSEJOS = [
  'Desconfía de los mensajes urgentes: la prisa es la herramienta favorita del engaño.',
  'Usa una contraseña distinta y larga para cada cuenta.',
  'Activa la verificación en dos pasos en tu correo y redes.',
  'Escribe tú mismo la dirección oficial en vez de hacer clic en enlaces.',
];
const DESTACADAS = ['phishing', 'ransomware', 'ingenieria-social', 'deepfakes'];
const RUTA = [
  { n: '0', t: '¿Cuánto sabes?', d: 'Autoevaluación para empezar', href: '/autoevaluacion' },
  { n: '1', t: 'Módulos', d: 'Aprende por unidades', href: '/modulos' },
  { n: '2', t: 'Casos prácticos', d: 'Interactúa con situaciones reales', href: '/casos-practicos' },
  { n: '3', t: 'Evaluaciones', d: 'Evalúate y certifícate', href: '/evaluaciones' },
  { n: '4', t: 'Biblioteca', d: 'Consulta PDF y videos', href: '/biblioteca' },
  { n: '5', t: 'Noticias', d: 'Mantente informado', href: '/noticias' },
];

export default async function HomePage() {
  const [categorias, articulos, noticiasTodas, recursos, terminos, banners, usuario, noticias] = await Promise.all([
    categoriaRepository.findAllConConteos(),
    publicacionRepository.findPublicadas('ARTICULO'),
    publicacionRepository.findPublicadas('NOTICIA'),
    recursoRepository.findAll(),
    glosarioRepository.findAll(),
    bannerRepository.findActivosPorGrupo('home-hero'),
    obtenerSesionActual(),
    publicacionRepository.findNoticias(undefined, 3),
  ]);

  const modulos = ordenarModulos(categorias);
  const completados = usuario ? new Set((await progresoRepository.completadosPorUsuario(usuario.id)).map((p) => p.categoriaId)) : new Set<string>();
  const ruta = await estadoRuta(usuario);
  // Botón principal según el punto de la ruta en que está el estudiante.
  const cta = !ruta.tieneInicial
    ? { href: '/autoevaluacion', texto: 'Comencemos con la autoevaluación' }
    : ruta.tieneFinal
      ? { href: '/mi-progreso', texto: 'Ver mi progreso' }
      : ruta.listoParaFinal
        ? { href: '/autoevaluacion', texto: 'Hacer la autoevaluación final' }
        : { href: '/modulos', texto: 'Seguir con los módulos' };
  const pct = modulos.length ? Math.round((completados.size / modulos.length) * 100) : 0;
  const siguiente = modulos.find((m) => !completados.has(m.id)) ?? modulos[0];

  const stats = [
    { valor: modulos.length, etiqueta: 'Módulos' },
    { valor: articulos.length + noticiasTodas.length, etiqueta: 'Publicaciones' },
    { valor: recursos.length, etiqueta: 'Recursos' },
    { valor: terminos.length, etiqueta: 'Términos en el glosario' },
  ];
  const destacadas = DESTACADAS.map((s) => AMENAZAS.find((a) => a.slug === s)).filter((a): a is (typeof AMENAZAS)[number] => !!a);

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: SITE_NAME, description: SITE_DESCRIPTION, url: SITE_URL }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL, potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/buscar?q={search_term_string}`, 'query-input': 'required name=search_term_string' } }} />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-primary-700 to-primary-500 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-seguro-500/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest backdrop-blur"><ShieldCheck size={14} aria-hidden="true" />Plataforma educativa UTLVT</span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">CiberShield <span className="text-seguro-400">UTLVT</span></h1>
            <p className="mt-4 max-w-xl text-xl leading-relaxed text-primary-100">Aprende a reconocer, prevenir y enfrentar las amenazas digitales.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={cta.href} className="group inline-flex items-center gap-2 rounded-xl bg-seguro-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/30 transition-colors hover:bg-seguro-600">{cta.texto} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
              {!usuario && (
                <Link href="/evaluaciones" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"><ClipboardCheck size={16} aria-hidden="true" />Ir a evaluaciones</Link>
              )}
            </div>
          </div>

          {/* Tarjeta de estado */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
            {usuario ? (
              <>
                <p className="font-mono text-xs uppercase tracking-widest text-primary-100">Tu progreso</p>
                <p className="mt-1 font-display text-2xl font-semibold">Hola, {usuario.name.split(' ')[0]}</p>
                <div className="mt-4 flex items-end justify-between text-sm"><span>{completados.size} de {modulos.length} módulos</span><span className="font-semibold text-seguro-400">{pct}%</span></div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-seguro-400 transition-all duration-700" style={{ width: `${pct}%` }} /></div>
                {!ruta.tieneInicial ? <Link href="/autoevaluacion" className="mt-5 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink-900 hover:bg-primary-50"><span>Primero: tu autoevaluación inicial</span><ArrowRight size={15} aria-hidden="true" /></Link> : ruta.listoParaFinal && !ruta.tieneFinal ? <Link href="/autoevaluacion" className="mt-5 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink-900 hover:bg-primary-50"><span>Autoevaluación final</span><ArrowRight size={15} aria-hidden="true" /></Link> : siguiente && <Link href={`/modulos/${siguiente.slug}`} className="mt-5 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink-900 hover:bg-primary-50"><span>{completados.size === modulos.length ? 'Repasar: ' : 'Continuar: '}{siguiente.nombre}</span><ArrowRight size={15} aria-hidden="true" /></Link>}
                <Link href="/mi-progreso" className="mt-3 block text-center text-xs font-medium text-primary-100 underline-offset-2 hover:underline">Ver todo mi progreso</Link>
              </>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-widest text-primary-100">Tu ruta</p>
                <ul className="mt-3 space-y-3">
                  {['Aprende en módulos cortos', 'Practica con casos reales', 'Evalúate y obtén tu certificado'].map((t) => (<li key={t} className="flex items-center gap-3 text-sm"><CheckCircle2 size={18} className="shrink-0 text-seguro-400" aria-hidden="true" />{t}</li>))}
                </ul>
                <div className="mt-5 flex gap-3"><Link href="/registro" className="flex-1 rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-ink-900 hover:bg-primary-50">Crear cuenta</Link><Link href="/login" className="flex-1 rounded-xl border border-white/30 py-2.5 text-center text-sm font-semibold hover:bg-white/10">Acceder</Link></div>
              </>
            )}
          </div>
        </div>
      </section>

      {banners.length > 0 && <BannerCarousel banners={banners} />}

      <div className="mx-auto max-w-6xl space-y-20 px-6 py-14">
        <StatsStrip stats={stats} />

        {/* Ruta */}
        <section aria-labelledby="ruta">
          <h2 id="ruta" className="sr-only">Ruta de la plataforma</h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {RUTA.map((r) => (
              <li key={r.t}>
                <Link href={r.href} className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-seguro-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-surface-dark-elevated">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-seguro-500 text-xs font-semibold text-white">{r.n}</span>
                  <span className="mt-3 font-display font-semibold text-ink-900 group-hover:text-primary-600 dark:text-white">{r.t}</span>
                  <span className="mt-0.5 text-xs text-ink-700 dark:text-slate-400">{r.d}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <SobreCiberseguridad />

        {/* Módulos destacados */}
        {!usuario && (
          <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><p className="font-mono text-xs uppercase tracking-widest text-seguro-600 dark:text-seguro-400">Aprende</p><h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white md:text-3xl">Módulos destacados</h2></div>
            <Link href="/modulos" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-300">Ver todos <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modulos.slice(0, 6).map((m, i) => (
              <Reveal key={m.id} delay={i * 60}><ModuloCard indice={i} slug={m.slug} nombre={m.nombre} descripcion={m.descripcion} lecciones={m._count.publicaciones} recursos={m._count.recursos} completado={completados.has(m.id)} /></Reveal>
            ))}
          </div>
        </section>
        )}

        {/* Amenazas destacadas */}
        {!usuario && (
          <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><p className="font-mono text-xs uppercase tracking-widest text-alerta-600">Conoce el riesgo</p><h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink-900 dark:text-white md:text-3xl"><ShieldAlert size={26} className="text-alerta-500" aria-hidden="true" />Amenazas destacadas</h2></div>
            <Link href="/amenazas" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-300">Ver las {AMENAZAS.length} <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destacadas.map((a, i) => (<Reveal key={a.slug} delay={i * 60}><ThreatCard amenaza={a} /></Reveal>))}
          </div>
        </section>
        )}

        {/* Consejos rápidos */}
        <section className="rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-white md:p-10">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold"><Lightbulb size={24} className="text-alerta-400" aria-hidden="true" />Consejos rápidos</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CONSEJOS.map((c) => (<li key={c} className="flex gap-3 rounded-xl bg-white/10 p-4 text-sm leading-relaxed backdrop-blur"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-seguro-400" aria-hidden="true" />{c}</li>))}
          </ul>
        </section>

        {/* Noticias recientes */}
        {!usuario && noticias.length > 0 && (
          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="font-mono text-xs uppercase tracking-widest text-seguro-600 dark:text-seguro-400">Mantente informado</p><h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink-900 dark:text-white md:text-3xl"><Newspaper size={26} aria-hidden="true" />Noticias recientes</h2></div>
              <Link href="/noticias" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-300">Todas las noticias <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {noticias.map((n, i) => (<Reveal key={n.id} delay={i * 60}><NoticiaCard noticia={n} /></Reveal>))}
            </div>
          </section>
        )}

        {/* Evaluaciones + foro */}
        {!usuario && (
          <section className="grid gap-5 md:grid-cols-2">
          <Link href="/evaluaciones" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-seguro-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-surface-dark-elevated">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-seguro-500 text-white"><ClipboardCheck size={26} aria-hidden="true" /></span>
            <span className="flex-1"><span className="block font-display text-lg font-semibold text-ink-900 dark:text-white">Evalúate</span><span className="text-sm text-ink-700 dark:text-slate-400">Aprueba una evaluación y obtén tu certificado.</span></span>
            <ArrowRight className="text-ink-700/40 transition-transform group-hover:translate-x-1" size={18} aria-hidden="true" />
          </Link>
          <Link href="/foro" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-seguro-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-surface-dark-elevated">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-white"><MessagesSquare size={26} aria-hidden="true" /></span>
            <span className="flex-1"><span className="block font-display text-lg font-semibold text-ink-900 dark:text-white">Foro de estudiantes</span><span className="text-sm text-ink-700 dark:text-slate-400">Comparte dudas y experiencias con tus compañeros.</span></span>
            <ArrowRight className="text-ink-700/40 transition-transform group-hover:translate-x-1" size={18} aria-hidden="true" />
          </Link>
        </section>
        )}
      </div>
    </>
  );
}
