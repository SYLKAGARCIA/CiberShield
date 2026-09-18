import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { PasswordStrengthChecker } from '@/components/tools/password-strength-checker';

export const metadata: Metadata = { title: 'Verificador de Contraseñas' };

export default function VerificadorContrasenasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Herramienta"
        titulo="Verificador de fortaleza"
        descripcion="Escribe una contraseña de práctica y descubre qué la hace fuerte o débil."
      />
      <div className="mx-auto max-w-xl px-6 pb-24 pt-10">
        <PasswordStrengthChecker />
      </div>
    </>
  );
}
