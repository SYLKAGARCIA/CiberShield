import { redirect } from 'next/navigation';

/** «Sobre la ciberseguridad» ahora es una sección del Inicio (conserva los enlaces antiguos). */
export default function SobreCiberseguridadPage() {
  redirect('/inicio#sobre-ciberseguridad');
}
