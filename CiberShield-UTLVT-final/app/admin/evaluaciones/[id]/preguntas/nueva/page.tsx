import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { PreguntaForm } from '../../../pregunta-form';
import { crearPregunta } from '../../../actions';

export const metadata: Metadata = { title: 'Nueva Pregunta | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function NuevaPreguntaPage({ params }: PageProps) {
  const evaluacion = await evaluacionRepository.findParaRendir(params.id);
  if (!evaluacion) notFound();

  const ordenSiguiente = evaluacion.preguntas.length + 1;
  const crearConId = crearPregunta.bind(null, evaluacion.id, ordenSiguiente);

  return (
    <div>
      <AdminPageHeader
        titulo={`Nueva pregunta — ${evaluacion.titulo}`}
        descripcion={`Será la pregunta #${ordenSiguiente} de esta evaluación.`}
      />
      <PreguntaForm accion={crearConId} volverA={`/admin/evaluaciones/${evaluacion.id}`} />
    </div>
  );
}
