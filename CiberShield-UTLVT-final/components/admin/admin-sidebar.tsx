import Link from 'next/link';
import {
  LayoutDashboard,
  FolderTree,
  Newspaper,
  BookMarked,
  HelpCircle,
  Library,
  Menu as MenuIcon,
  Users,
  Settings,
  ClipboardList,
  Award,
  Star,
  Home,
  GalleryHorizontal,
} from 'lucide-react';

type SeccionAdmin = {
  href: string;
  etiqueta: string;
  icono: typeof LayoutDashboard;
  exact?: boolean;
  soloAdmin?: boolean;
};

const SECCIONES: SeccionAdmin[] = [
  { href: '/admin', etiqueta: 'Dashboard', icono: LayoutDashboard, exact: true },
  { href: '/admin/contenido-inicio', etiqueta: 'Contenido de Inicio', icono: Home, soloAdmin: true },
  { href: '/admin/banners', etiqueta: 'Banners', icono: GalleryHorizontal },
  { href: '/admin/categorias', etiqueta: 'Categorías', icono: FolderTree },
  { href: '/admin/publicaciones', etiqueta: 'Artículos y Noticias', icono: Newspaper },
  { href: '/admin/glosario', etiqueta: 'Glosario', icono: BookMarked },
  { href: '/admin/faq', etiqueta: 'Preguntas Frecuentes', icono: HelpCircle },
  { href: '/admin/recursos', etiqueta: 'Recursos', icono: Library },
  { href: '/admin/evaluaciones', etiqueta: 'Evaluaciones', icono: ClipboardList },
  { href: '/admin/certificados', etiqueta: 'Certificados', icono: Award },
  { href: '/admin/insignias', etiqueta: 'Insignias', icono: Star },
  { href: '/admin/menus', etiqueta: 'Menús', icono: MenuIcon },
  { href: '/admin/usuarios', etiqueta: 'Usuarios', icono: Users, soloAdmin: true },
  { href: '/admin/configuracion', etiqueta: 'Configuración', icono: Settings, soloAdmin: true },
];

export function AdminSidebar({ rol }: { rol: string }) {
  return (
    <nav aria-label="Navegación del panel" className="space-y-1">
      {SECCIONES.map((seccion) => {
        if (seccion.soloAdmin && rol !== 'ADMIN') return null;
        return (
          <Link
            key={seccion.href}
            href={seccion.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-surface-dark dark:hover:text-white"
          >
            <seccion.icono size={17} aria-hidden="true" />
            {seccion.etiqueta}
          </Link>
        );
      })}
    </nav>
  );
}
