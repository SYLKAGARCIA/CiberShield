import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: { codigo?: string };
}

/**
 * Puente entre el formulario de `/certificados/verificar` (que envía
 * por GET, sin JavaScript) y la página de detalle
 * `/certificados/[codigo]`. Sin código, vuelve al buscador.
 */
export default function CertificadosIndexPage({ searchParams }: PageProps) {
  const codigo = searchParams.codigo?.trim();
  redirect(codigo ? `/certificados/${encodeURIComponent(codigo)}` : '/certificados/verificar');
}
