import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { obtenerSesionActual, tieneAccesoAdmin } from '@/lib/auth';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { ArticleCard } from '@/components/shared/article-card';
import { PageHeader } from '@/components/shared/page-header';

export const metadata: Metadata = {
  title: 'Artículos y Noticias | CiberShield UTLVT',
  description: 'Contenido educativo y noticias de ciberseguridad para estudiantes de la UTLVTE.',
};

export default async function ArticulosNoticiasPage() {
  const usuario = await obtenerSesionActual();

  if (!usuario || tieneAccesoAdmin(usuario.role.name)) {
    redirect('/inicio');
  }

  const [articulos, noticias] = await Promise.all([
    publicacionRepository.findPublicadas('ARTICULO'),
    publicacionRepository.findPublicadas('NOTICIA'),
  ]);

  const publicaciones = [...articulos, ...noticias].sort((a, b) => {
    const fechaA = a.publicadoEn ? new Date(a.publicadoEn).getTime() : 0;
    const fechaB = b.publicadoEn ? new Date(b.publicadoEn).getTime() : 0;
    return fechaB - fechaA;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Contenido para estudiantes"
        titulo="Artículos y Noticias"
        descripcion="Consulta contenido educativo y mantente informado sobre temas actuales de ciberseguridad."
      />

      {publicaciones.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-surface-dark-elevated">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            Todavía no hay publicaciones disponibles
          </h2>
          <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">
            Pronto encontrarás nuevos artículos y noticias de ciberseguridad.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {publicaciones.map((publicacion) => (
            <ArticleCard key={publicacion.id} publicacion={publicacion} />
          ))}
        </div>
      )}
    </div>
  );
}
