import type { Metadata } from 'next';
import {
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Smartphone,
  Globe,
  Lock,
  Share2,
  HardDriveDownload,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Buenas Prácticas',
  descripcion: 'Hábitos concretos para reducir tu exposición a riesgos digitales.',
  ruta: '/buenas-practicas',
});

const PRACTICAS = [
  {
    icono: KeyRound,
    titulo: 'Usa contraseñas fuertes y únicas',
    descripcion:
      'Combina mayúsculas, números y símbolos, y nunca repitas la misma contraseña en varios sitios. Un gestor de contraseñas te ayuda a recordarlas sin sacrificar seguridad.',
  },
  {
    icono: ShieldCheck,
    titulo: 'Activa la autenticación de dos factores (2FA)',
    descripcion:
      'Agrega una segunda verificación (app autenticadora o SMS) a tus cuentas importantes. Aunque roben tu contraseña, no podrán entrar sin ese segundo paso.',
  },
  {
    icono: HardDriveDownload,
    titulo: 'Haz copias de seguridad periódicas',
    descripcion:
      'Guarda tus archivos importantes en al menos dos lugares distintos (nube + disco externo). Así un ransomware o una falla técnica no significa perderlo todo.',
  },
  {
    icono: RefreshCw,
    titulo: 'Mantén tus dispositivos actualizados',
    descripcion:
      'Las actualizaciones del sistema operativo y las apps suelen corregir vulnerabilidades ya conocidas por atacantes. Postergarlas te deja expuesto innecesariamente.',
  },
  {
    icono: Share2,
    titulo: 'Cuida lo que compartes en redes sociales',
    descripcion:
      'Ubicación en tiempo real, rutinas diarias o datos personales pueden usarse en tu contra. Revisa la privacidad de tus perfiles regularmente.',
  },
  {
    icono: Globe,
    titulo: 'Navega con criterio',
    descripcion:
      'Verifica que los sitios usen HTTPS, desconfía de ofertas demasiado buenas, y evita descargar software de fuentes no oficiales.',
  },
  {
    icono: Smartphone,
    titulo: 'Protege físicamente tus dispositivos',
    descripcion:
      'Usa bloqueo de pantalla, cifrado y ubicación remota. Un dispositivo perdido no debería significar acceso libre a tu vida digital.',
  },
  {
    icono: Lock,
    titulo: 'Piensa antes de dar tus datos',
    descripcion:
      'Antes de llenar un formulario, pregúntate si esa plataforma realmente necesita esa información y qué haría con ella si sufre una filtración.',
  },
] as const;

export default function BuenasPracticasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Buenas Prácticas"
        titulo="Hábitos que reducen tu riesgo real"
        descripcion="No necesitas ser experto: la mayoría de los incidentes se evitan con hábitos simples y consistentes."
      />

      <div className="mx-auto max-w-5xl px-6 pb-24 pt-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PRACTICAS.map((practica, i) => (
            <Reveal key={practica.titulo} delay={(i % 4) * 60}>
              <div className="group relative flex gap-4 rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-transparent hover:shadow-xl hover:shadow-primary-900/10 dark:border-slate-800 dark:bg-surface-dark-elevated">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-slate-200 transition-colors group-hover:bg-seguro-500 dark:bg-slate-700"
                />
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-seguro-500/10 text-seguro-600 dark:text-seguro-400">
                  <practica.icono size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">
                    {practica.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-slate-400">
                    {practica.descripcion}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
