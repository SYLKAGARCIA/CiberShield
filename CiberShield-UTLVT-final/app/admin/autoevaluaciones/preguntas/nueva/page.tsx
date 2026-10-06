import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { categoriaRepository } from '@/repository/categoria.repository';
import { ordenarModulos } from '@/lib/modulos-data';
import { AMENAZAS } from '@/lib/amenazas-data';
import { PreguntaAutoevaluacionForm } from '../../pregunta-autoevaluacion-form';
import { crearPreguntaAutoevaluacion } from '../../actions';

export const metadata: Metadata = { title: 'Nueva pregunta de Autoevaluación | Admin' };

export default async function NuevaPreguntaAutoevaluacionPage() {
  const categorias = await categoriaRepository.findAll();
  const modulos = ordenarModulos(categorias).map((c) => ({ slug: c.slug, nombre: c.nombre }));

  return (
    <div>
      <AdminPageHeader titulo="Nueva pregunta — Autoevaluación" descripcion="Se agregará al final de su módulo. Luego puedes cambiar su posición desde la lista." />
      <PreguntaAutoevaluacionForm
        accion={crearPreguntaAutoevaluacion}
        modulos={modulos}
        amenazas={AMENAZAS.map((a) => ({ slug: a.slug, nombre: a.nombre }))}
        etiquetaBoton="Crear pregunta"
      />
    </div>
  );
}
