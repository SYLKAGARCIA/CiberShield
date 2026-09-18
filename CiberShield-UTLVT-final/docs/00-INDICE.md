# Índice del Proyecto — CiberShield UTLVT

> Nota: el proyecto se rebautizó de "CiberSeguridad Estudiantil" a
> "CiberShield UTLVT" durante un rediseño visual — ver
> [REDISENO-VISUAL-CIBERSHIELD.md](./REDISENO-VISUAL-CIBERSHIELD.md).
> Los documentos de fases (`01` a `04`) se conservan sin editar como
> registro histórico y aún mencionan el nombre anterior.

## Descripción general

Plataforma web informativa sobre ciberseguridad orientada a la
concientización de estudiantes universitarios. Combina contenido
educativo, herramientas interactivas, evaluaciones con certificación y un
panel administrativo completo para gestionar todo el contenido sin tocar
código.

## Objetivos

- Educar a estudiantes sobre amenazas digitales y buenas prácticas de
  ciberseguridad.
- Ofrecer herramientas prácticas (generador de contraseñas, simulador de
  phishing, evaluaciones, etc.).
- Entregar una plataforma profesional, accesible, segura y gratuita,
  desplegable en Vercel.
- Permitir la administración total del contenido desde un panel gráfico.

## Tecnologías

| Categoría | Tecnología |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Estilos | Tailwind CSS, next-themes (modo oscuro/claro) |
| Backend | API Routes de Next.js, Server Actions |
| Base de datos | SQLite (desarrollo local) → migrable a PostgreSQL/Supabase |
| ORM | Prisma |
| Control de versiones | Git + GitHub |
| Despliegue | Vercel |

## Arquitectura

Clean Architecture adaptada a Next.js App Router, con separación en capas:

```
UI (app/, components/)
   ↓
Application (features/, hooks/)
   ↓
Domain (types/, lib/validations)
   ↓
Infrastructure (repository/, services/, prisma/)
```

Patrones aplicados: Repository Pattern, SOLID, DRY, KISS, componentes
reutilizables.

## Fases del proyecto

| # | Fase | Documento | Estado |
|---|---|---|---|
| 1 | Setup base (Next.js, TS, Tailwind, Prisma/SQLite) | [01-FASE-1.md](./01-FASE-1.md) | ✅ Completado |
| 2 | Modelo de datos completo | [02-FASE-2.md](./02-FASE-2.md) | ✅ Completado |
| 3 | Layout público y diseño (modo oscuro/claro) | [03-FASE-3.md](./03-FASE-3.md) | ✅ Completado |
| 4 | Contenido educativo | [04-FASE-4.md](./04-FASE-4.md) | ✅ Completado |
| 5 | Autenticación y roles | [05-FASE-5.md](./05-FASE-5.md) | ✅ Completado |
| 6 | Panel administrativo | [06-FASE-6.md](./06-FASE-6.md) | ✅ Completado |
| 7 | Herramientas interactivas | [07-FASE-7.md](./07-FASE-7.md) | ✅ Completado |
| 8 | Evaluaciones y certificados PDF | [08-FASE-8.md](./08-FASE-8.md) | ✅ Completado |
| 9 | SEO, accesibilidad y PWA | [09-FASE-9.md](./09-FASE-9.md) | ✅ Completado |
| 10 | Optimización, seguridad OWASP, scripts .bat y documentación final | [10-FASE-10.md](./10-FASE-10.md) | ⏳ Pendiente |

Registro de cambios: [CHANGELOG.md](./CHANGELOG.md)

Rediseño visual y rebranding (fuera del roadmap de 10 fases):
[REDISENO-VISUAL-CIBERSHIELD.md](./REDISENO-VISUAL-CIBERSHIELD.md)

Rediseño estructural — composición y layout (fuera del roadmap de 10 fases):
[REDISENO-ESTRUCTURAL.md](./REDISENO-ESTRUCTURAL.md)

## Progreso general del proyecto

**Avance: 9 / 10 fases completadas (90%)**

```
[██████████████████░░] 90%
```

| Última actualización | Versión actual |
|---|---|
| 2026-08-05 | 0.9.0 |

## Nota sobre entrega adelantada

Los 13 scripts `.bat` de automatización (previstos formalmente para la
Fase 10) ya fueron entregados en `scripts/`. Se documentarán
formalmente en `docs/10-FASE-10.md` cuando se llegue a esa fase, y se
mencionan aquí para que no se pierda el registro de qué existe ya en el
proyecto.
