import type { Metadata } from 'next';
import { KeyRound, ShieldCheck, MailWarning, Gauge, ListChecks, Search } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { ToolCard } from '@/components/tools/tool-card';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Herramientas',
  descripcion: 'Generador y verificador de contraseñas, simulador de phishing y más herramientas interactivas.',
  ruta: '/herramientas',
});

const HERRAMIENTAS = [
  {
    href: '/herramientas/generador-contrasenas',
    titulo: 'Generador de contraseñas',
    descripcion: 'Crea contraseñas seguras y aleatorias en tu propio navegador.',
    icono: KeyRound,
  },
  {
    href: '/herramientas/verificador-contrasenas',
    titulo: 'Verificador de fortaleza',
    descripcion: 'Evalúa qué tan segura es una contraseña y por qué.',
    icono: ShieldCheck,
  },
  {
    href: '/herramientas/simulador-phishing',
    titulo: 'Simulador de phishing',
    descripcion: 'Practica identificando correos falsos con ejemplos reales.',
    icono: MailWarning,
  },
  {
    href: '/herramientas/calculadora-seguridad',
    titulo: 'Calculadora de seguridad',
    descripcion: 'Responde 7 preguntas y obtén tu puntaje de seguridad digital.',
    icono: Gauge,
  },
  {
    href: '/herramientas/checklist',
    titulo: 'Checklist de seguridad',
    descripcion: 'Sigue tu progreso aplicando buenas prácticas, paso a paso.',
    icono: ListChecks,
  },
  {
    href: '/buscar',
    titulo: 'Buscador',
    descripcion: 'Encuentra artículos, noticias y términos del glosario.',
    icono: Search,
  },
] as const;

export default function HerramientasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Herramientas"
        titulo="Practica, no solo leas"
        descripcion="Herramientas interactivas para aplicar lo aprendido de inmediato."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HERRAMIENTAS.map((herramienta, i) => (
            <Reveal key={herramienta.href} delay={i * 60}>
              <ToolCard {...herramienta} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
