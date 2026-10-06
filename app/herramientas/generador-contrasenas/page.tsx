import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { PasswordGenerator } from '@/components/tools/password-generator';

export const metadata: Metadata = { title: 'Generador de Contraseñas' };

export default function GeneradorContrasenasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Herramienta"
        titulo="Generador de contraseñas seguras"
        descripcion="Ajusta las opciones y genera una contraseña aleatoria al instante."
      />
      <div className="mx-auto max-w-xl px-6 pb-24 pt-10">
        <PasswordGenerator />
      </div>
    </>
  );
}
