import { redirect } from 'next/navigation';

/** La sección "Recursos" ahora se llama "Biblioteca" (con visor integrado de PDF y video). */
export default function RecursosPage({ searchParams }: { searchParams: { tipo?: string } }) {
  redirect(searchParams.tipo ? `/biblioteca?tipo=${encodeURIComponent(searchParams.tipo)}` : '/biblioteca');
}
