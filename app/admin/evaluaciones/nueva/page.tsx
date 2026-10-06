import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { EvaluacionForm } from '../evaluacion-form';
import { crearEvaluacion } from '../actions';

export const metadata: Metadata = { title: 'Nueva Evaluación | Admin' };

export default function NuevaEvaluacionPage() {
  return (
    <div>
      <AdminPageHeader titulo="Nueva evaluación" />
      <EvaluacionForm accion={crearEvaluacion} />
    </div>
  );
}
