'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, GraduationCap, Library, Briefcase, ClipboardCheck, Target, MessagesSquare, Newspaper, BookMarked,
  ChevronDown, Menu, X, ShieldAlert, Wrench, ListChecks, HelpCircle, LayoutDashboard, UserCircle2,
  Globe2, Flag, Siren, TrendingUp, ArrowRight, type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getIconoCategoria } from '@/lib/iconos-categorias';
import { LogoutButton } from '@/components/admin/logout-button';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export interface ModuloNav { slug: string; nombre: string; descripcion: string | null }
export interface UsuarioNav { name: string; rol: string; esStaff: boolean }

interface Props {
  modulos: ModuloNav[];
  usuario: UsuarioNav | null;
}

type Enlace = { href: string; etiqueta: string; icono: LucideIcon; desc?: string };

const NOTICIAS: Enlace[] = [
  { href: '/noticias', etiqueta: 'Todas las noticias', icono: Newspaper },
  { href: '/noticias?clasificacion=NACIONAL', etiqueta: 'Nacionales', icono: Flag },
  { href: '/noticias?clasificacion=INTERNACIONAL', etiqueta: 'Internacionales', icono: Globe2 },
  { href: '/noticias?clasificacion=ALERTA', etiqueta: 'Alertas de ciberseguridad', icono: Siren },
  { href: '/noticias?clasificacion=TENDENCIA', etiqueta: 'Tendencias', icono: TrendingUp },
];

const MAS: Enlace[] = [
  { href: '/amenazas', etiqueta: 'Amenazas', icono: ShieldAlert, desc: 'Catálogo de amenazas digitales' },
  { href: '/herramientas', etiqueta: 'Herramientas', icono: Wrench, desc: 'Generador, verificador, simulador' },
  { href: '/buenas-practicas', etiqueta: 'Buenas prácticas', icono: ListChecks },
  { href: '/faq', etiqueta: 'Preguntas frecuentes', icono: HelpCircle },
];

const AUTO: Enlace = { href: '/autoevaluacion', etiqueta: 'Autoevaluación', icono: Target };

const SIMPLES: (Enlace & { despuesDe?: string })[] = [
  { href: '/biblioteca', etiqueta: 'Biblioteca', icono: Library },
  { href: '/casos-practicos', etiqueta: 'Casos prácticos', icono: Briefcase },
  { href: '/evaluaciones', etiqueta: 'Evaluaciones', icono: ClipboardCheck },
  { href: '/foro', etiqueta: 'Foro', icono: MessagesSquare },
];

export function MainNav({ modulos, usuario }: Props) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState<string | null>(null);
  const [movil, setMovil] = useState(false);
  const refNav = useRef<HTMLDivElement>(null);

  useEffect(() => { setAbierto(null); setMovil(false); }, [pathname]);

  useEffect(() => {
    const fuera = (e: MouseEvent) => {
      if (refNav.current && !refNav.current.contains(e.target as Node)) setAbierto(null);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(null);
    document.addEventListener('mousedown', fuera);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', fuera); document.removeEventListener('keydown', esc); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = movil ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [movil]);

  const activa = (href: string) => {
    const base = href.split('?')[0];
    return base === '/inicio' ? pathname === '/inicio' : pathname.startsWith(base);
  };

  const claseTop = (on: boolean) =>
    cn(
      'relative flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-[13px] font-medium transition-colors',
      'after:absolute after:inset-x-2 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-seguro-500 after:transition-transform after:duration-200',
      on
        ? 'text-primary-600 after:scale-x-100 dark:text-white'
        : 'text-ink-700 after:scale-x-0 hover:bg-primary-50 hover:text-primary-600 hover:after:scale-x-100 dark:text-slate-300 dark:hover:bg-surface-dark dark:hover:text-white'
    );

  const toggle = (k: string) => setAbierto((v) => (v === k ? null : k));
  const hover = (k: string) => ({
    onMouseEnter: () => window.matchMedia('(hover: hover)').matches && setAbierto(k),
  });

  const modulosActivo = pathname.startsWith('/modulos') || pathname.startsWith('/amenazas');
  const noticiasActivo = pathname.startsWith('/noticias') || pathname.startsWith('/articulos');
  const masActivo = MAS.some((m) => m.href !== '/amenazas' && activa(m.href));

  return (
    <div ref={refNav} className="flex flex-1 items-center justify-end gap-1 xl:justify-between">
      {/* ===== Escritorio ===== */}
      <nav aria-label="Menú principal" className="hidden flex-1 items-center justify-center gap-0.5 xl:flex" onMouseLeave={() => setAbierto(null)}>
        <Link href="/inicio" className={claseTop(pathname === '/inicio')}><Home size={15} className="hidden 2xl:block" aria-hidden="true" />Inicio</Link>

        <Link href={AUTO.href} className={claseTop(activa(AUTO.href))} aria-current={activa(AUTO.href) ? 'page' : undefined}>
          <AUTO.icono size={15} className="hidden 2xl:block" aria-hidden="true" />{AUTO.etiqueta}
        </Link>

        {/* Mega menú de módulos */}
        <div className="relative" {...hover('modulos')}>
          <button type="button" aria-expanded={abierto === 'modulos'} aria-haspopup="true" onClick={() => toggle('modulos')} className={claseTop(modulosActivo)}>
            <GraduationCap size={15} className="hidden 2xl:block" aria-hidden="true" />Módulos
            <ChevronDown size={13} className={cn('transition-transform', abierto === 'modulos' && 'rotate-180')} aria-hidden="true" />
          </button>
          {abierto === 'modulos' && (
            <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 animate-fade-in-up">
              <div className="grid grid-cols-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-primary-900/15 dark:border-slate-700 dark:bg-surface-dark-elevated">
                <div className="col-span-3 p-4">
                  <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-ink-700/60 dark:text-slate-500">Ruta de aprendizaje</p>
                  <ul className="space-y-0.5">
                    {modulos.map((m, i) => {
                      const Icono = getIconoCategoria(m.slug);
                      return (
                        <li key={m.slug}>
                          <Link href={`/modulos/${m.slug}`} className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-primary-50 dark:hover:bg-surface-dark">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 group-hover:bg-seguro-500 group-hover:text-white dark:text-primary-300"><Icono size={16} aria-hidden="true" /></span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-medium text-ink-900 dark:text-white">Módulo {i + 1} · {m.nombre}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                    {modulos.length === 0 && <li className="px-2 py-2 text-sm text-ink-700 dark:text-slate-400">Aún no hay módulos.</li>}
                  </ul>
                </div>
                <div className="col-span-2 flex flex-col justify-between bg-primary-500 p-5 text-white dark:bg-primary-700">
                  <div>
                    <p className="font-display text-base font-semibold">Aprende paso a paso</p>
                    <p className="mt-1 text-xs leading-relaxed text-primary-100">Cada módulo es un mini curso con lecturas, recursos y actividades.</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Link href="/modulos" className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20">Ver todos los módulos <ArrowRight size={13} aria-hidden="true" /></Link>
                    <Link href="/amenazas" className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20">Catálogo de amenazas <ArrowRight size={13} aria-hidden="true" /></Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {SIMPLES.map((e) => (
          <Link key={e.href} href={e.href} className={claseTop(activa(e.href))} aria-current={activa(e.href) ? 'page' : undefined}>
            <e.icono size={15} className="hidden 2xl:block" aria-hidden="true" />{e.etiqueta}
          </Link>
        ))}

        {/* Noticias */}
        <div className="relative" {...hover('noticias')}>
          <button type="button" aria-expanded={abierto === 'noticias'} aria-haspopup="true" onClick={() => toggle('noticias')} className={claseTop(noticiasActivo)}>
            <Newspaper size={15} className="hidden 2xl:block" aria-hidden="true" />Noticias
            <ChevronDown size={13} className={cn('transition-transform', abierto === 'noticias' && 'rotate-180')} aria-hidden="true" />
          </button>
          {abierto === 'noticias' && (
            <div className="absolute left-0 top-full z-50 w-64 pt-3 animate-fade-in-up">
              <ul className="rounded-xl border border-slate-200 bg-white p-2 shadow-2xl shadow-primary-900/15 dark:border-slate-700 dark:bg-surface-dark-elevated">
                {NOTICIAS.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-300 dark:hover:bg-surface-dark dark:hover:text-white">
                      <n.icono size={15} aria-hidden="true" />{n.etiqueta}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Link href="/glosario" className={claseTop(activa('/glosario'))}><BookMarked size={15} className="hidden 2xl:block" aria-hidden="true" />Glosario</Link>

        {/* Más */}
        <div className="relative" {...hover('mas')}>
          <button type="button" aria-expanded={abierto === 'mas'} aria-haspopup="true" onClick={() => toggle('mas')} className={claseTop(masActivo)}>
            Más <ChevronDown size={13} className={cn('transition-transform', abierto === 'mas' && 'rotate-180')} aria-hidden="true" />
          </button>
          {abierto === 'mas' && (
            <div className="absolute right-0 top-full z-50 w-72 pt-3 animate-fade-in-up">
              <ul className="rounded-xl border border-slate-200 bg-white p-2 shadow-2xl shadow-primary-900/15 dark:border-slate-700 dark:bg-surface-dark-elevated">
                {MAS.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-primary-50 dark:hover:bg-surface-dark">
                      <n.icono size={16} className="mt-0.5 text-primary-600 dark:text-primary-300" aria-hidden="true" />
                      <span>
                        <span className="block text-sm font-medium text-ink-900 dark:text-white">{n.etiqueta}</span>
                        {n.desc && <span className="block text-xs text-ink-700/70 dark:text-slate-500">{n.desc}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* ===== Acciones (derecha) ===== */}
      <div className="flex items-center gap-2">
        {usuario ? (
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => toggle('usuario')}
              aria-expanded={abierto === 'usuario'}
              aria-label="Menú de usuario"
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-sm hover:border-seguro-500 dark:border-slate-700 dark:bg-surface-dark-elevated"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">{usuario.name.charAt(0).toUpperCase()}</span>
              <span className="hidden max-w-[110px] truncate font-medium text-ink-900 dark:text-white 2xl:inline">{usuario.name.split(' ')[0]}</span>
              <ChevronDown size={13} aria-hidden="true" className="text-ink-700 dark:text-slate-400" />
            </button>
            {abierto === 'usuario' && (
              <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl shadow-primary-900/15 animate-fade-in-up dark:border-slate-700 dark:bg-surface-dark-elevated">
                <div className="border-b border-slate-100 px-3 pb-2 pt-1 dark:border-slate-800">
                  <p className="truncate text-sm font-semibold text-ink-900 dark:text-white">{usuario.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-seguro-600 dark:text-seguro-400">{usuario.rol}</p>
                </div>
                <Link href="/mi-progreso" className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-primary-50 dark:text-slate-300 dark:hover:bg-surface-dark"><UserCircle2 size={15} aria-hidden="true" />Mi progreso</Link>
                {usuario.esStaff && (
                  <Link href="/admin" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-primary-50 dark:text-slate-300 dark:hover:bg-surface-dark"><LayoutDashboard size={15} aria-hidden="true" />Panel administrativo</Link>
                )}
                <div className="mt-1 border-t border-slate-100 p-2 dark:border-slate-800"><LogoutButton /></div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-white sm:block">Acceder</Link>
            <Link href="/registro" className="hidden rounded-lg bg-seguro-500 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-seguro-600 sm:block">Registrarse</Link>
          </>
        )}
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setMovil((v) => !v)}
          aria-expanded={movil}
          aria-label={movil ? 'Cerrar menú' : 'Abrir menú'}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-900 hover:bg-primary-50 dark:text-white dark:hover:bg-surface-dark xl:hidden"
        >
          {movil ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ===== Móvil / tablet ===== */}
      {movil && (
        <nav aria-label="Menú principal (móvil)" className="fixed inset-x-0 bottom-0 top-[65px] z-40 overflow-y-auto bg-white px-5 pb-10 pt-4 animate-fade-in-up dark:bg-surface-dark xl:hidden">
          <ul className="mx-auto max-w-lg space-y-1">
            <li><Link href="/inicio" className={filaMovil(pathname === '/inicio')}><Home size={17} aria-hidden="true" />Inicio</Link></li>
            <li><Link href={AUTO.href} className={filaMovil(activa(AUTO.href))}><AUTO.icono size={17} aria-hidden="true" />{AUTO.etiqueta}</Link></li>
            <li>
              <details className="group" open={modulosActivo}>
                <summary className={cn(filaMovil(modulosActivo), 'cursor-pointer list-none justify-between')}>
                  <span className="flex items-center gap-3"><GraduationCap size={17} aria-hidden="true" />Módulos</span>
                  <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3 dark:border-slate-700">
                  <li><Link href="/modulos" className="block rounded-md px-3 py-2 text-sm font-semibold text-seguro-600 dark:text-seguro-400">Ver todos los módulos</Link></li>
                  {modulos.map((m, i) => (
                    <li key={m.slug}><Link href={`/modulos/${m.slug}`} className="block rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-primary-50 dark:text-slate-300 dark:hover:bg-surface-dark-elevated">Módulo {i + 1} · {m.nombre}</Link></li>
                  ))}
                  <li><Link href="/amenazas" className="block rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-primary-50 dark:text-slate-300 dark:hover:bg-surface-dark-elevated">Catálogo de amenazas</Link></li>
                </ul>
              </details>
            </li>
            {SIMPLES.map((e) => (
              <li key={e.href}><Link href={e.href} className={filaMovil(activa(e.href))}><e.icono size={17} aria-hidden="true" />{e.etiqueta}</Link></li>
            ))}
            <li>
              <details className="group" open={noticiasActivo}>
                <summary className={cn(filaMovil(noticiasActivo), 'cursor-pointer list-none justify-between')}>
                  <span className="flex items-center gap-3"><Newspaper size={17} aria-hidden="true" />Noticias</span>
                  <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3 dark:border-slate-700">
                  {NOTICIAS.map((n) => (
                    <li key={n.href}><Link href={n.href} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-primary-50 dark:text-slate-300 dark:hover:bg-surface-dark-elevated"><n.icono size={14} aria-hidden="true" />{n.etiqueta}</Link></li>
                  ))}
                </ul>
              </details>
            </li>
            <li><Link href="/glosario" className={filaMovil(activa('/glosario'))}><BookMarked size={17} aria-hidden="true" />Glosario</Link></li>
            <li className="px-3 pb-1 pt-4 font-mono text-[10px] uppercase tracking-widest text-ink-700/60 dark:text-slate-500">Más</li>
            {MAS.map((n) => (
              <li key={n.href}><Link href={n.href} className={filaMovil(activa(n.href))}><n.icono size={17} aria-hidden="true" />{n.etiqueta}</Link></li>
            ))}
            <li className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
              {usuario ? (
                <div className="space-y-2">
                  <p className="px-3 text-sm text-ink-700 dark:text-slate-400">Sesión de <strong className="text-ink-900 dark:text-white">{usuario.name}</strong></p>
                  <Link href="/mi-progreso" className={filaMovil(activa('/mi-progreso'))}><UserCircle2 size={17} aria-hidden="true" />Mi progreso</Link>
                  {usuario.esStaff && <Link href="/admin" className={filaMovil(false)}><LayoutDashboard size={17} aria-hidden="true" />Panel administrativo</Link>}
                  <div className="px-3"><LogoutButton /></div>
                </div>
              ) : (
                <div className="flex gap-3 px-3">
                  <Link href="/login" className="flex-1 rounded-lg border border-slate-300 py-2.5 text-center text-sm font-medium text-ink-900 dark:border-slate-700 dark:text-white">Acceder</Link>
                  <Link href="/registro" className="flex-1 rounded-lg bg-seguro-500 py-2.5 text-center text-sm font-semibold text-white">Registrarse</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

function filaMovil(on: boolean) {
  return cn(
    'flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium transition-colors',
    on ? 'bg-seguro-500/10 text-seguro-600 dark:text-seguro-400' : 'text-ink-900 hover:bg-primary-50 dark:text-white dark:hover:bg-surface-dark-elevated'
  );
}
