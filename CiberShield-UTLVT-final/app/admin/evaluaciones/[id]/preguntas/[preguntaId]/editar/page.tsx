import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { preguntaRepository } from '@/repository/pregunta.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { PreguntaForm } from '../../../../pregunta-form';
import { actualizarPregunta } from '../../../../actions';

export const metadata: Metadata = { title: 'Editar Pregunta | Admin' };

interface PageProps {
  params: { id: string; preguntaId: string };
}

export default async function EditarPreguntaPage({ params }: PageProps) {
  const [evaluacion, pregunta] = await Promise.all([
    evaluacionRepository.findParaRendir(params.id),
    preguntaRepository.findById(params.preguntaId),
  ]);

  if (!evaluacion || !pregunta || pregunta.evaluacionId !== evaluacion.id) notFound();

  const actualizarConIds = actualizarPregunta.bind(null, evaluacion.id, pregunta.id);

  return (
    <div>
      <AdminPageHeader
        titulo={`Editar pregunta — ${evaluacion.titulo}`}
        descripcion="Cambia el enunciado, las opciones, o cuál es la correcta."
      />
      <PreguntaForm
        accion={actualizarConIds}
        volverA={`/admin/evaluaciones/${evaluacion.id}`}
        valoresIniciales={{
          enunciado: pregunta.enunciado,
          opciones: pregunta.opciones.map((o) => ({ texto: o.texto, esCorrecta: o.esCorrecta })),
        }}
        etiquetaBoton="Guardar cambios"
      />
    </div>
  );
}
