import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { categoriaRepository } from '@/repository/categoria.repository';
import { preguntaAutoevaluacionRepository } from '@/repository/pregunta-autoevaluacion.repository';
import { ordenarModulos } from '@/lib/modulos-data';
import { AMENAZAS } from '@/lib/amenazas-data';
import { PreguntaAutoevaluacionForm } from '../../../pregunta-autoevaluacion-form';
import { actualizarPreguntaAutoevaluacion } from '../../../actions';

export const metadata: Metadata = { title: 'Editar pregunta de Autoevaluación | Admin' };

export default async function EditarPreguntaAutoevaluacionPage({ params }: { params: { id: string } }) {
  const [pregunta, categorias] = await Promise.all([
    preguntaAutoevaluacionRepository.findById(params.id).catch(() => null),
    categoriaRepository.findAll(),
  ]);
  if (!pregunta) notFound();

  const modulos = ordenarModulos(categorias).map((c) => ({ slug: c.slug, nombre: c.nombre }));
  const actualizarConId = actualizarPreguntaAutoevaluacion.bind(null, pregunta.id);

  return (
    <div>
      <AdminPageHeader titulo="Editar pregunta — Autoevaluación" descripcion="Cambia la situación, las opciones, la respuesta correcta o su estado." />
      <PreguntaAutoevaluacionForm
        accion={actualizarConId}
        modulos={modulos}
        amenazas={AMENAZAS.map((a) => ({ slug: a.slug, nombre: a.nombre }))}
        valoresIniciales={{
          moduloSlug: pregunta.moduloSlug,
          amenazaSlug: pregunta.amenazaSlug,
          tema: pregunta.tema,
          titulo: pregunta.titulo,
          situacion: pregunta.situacion,
          opciones: pregunta.opciones,
          correcta: pregunta.correcta,
          explicacion: pregunta.explicacion,
          activa: pregunta.activa,
        }}
        etiquetaBoton="Guardar cambios"
      />
    </div>
  );
}
