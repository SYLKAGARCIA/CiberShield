# Fase 1 — Setup Base del Proyecto

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado | 100% | 2026-08-03 | 2026-08-03 |

## Objetivos

- Inicializar el proyecto con Next.js 14 (App Router) + TypeScript.
- Configurar Tailwind CSS con soporte de modo oscuro/claro.
- Configurar Prisma ORM con una base de datos SQLite local (sin dependencia
  de servicios externos en esta fase).
- Establecer la estructura de carpetas definitiva del proyecto, alineada a
  Clean Architecture y al Repository Pattern.
- Confirmar que el proyecto compila y renderiza correctamente antes de
  avanzar a fases con contenido real.

## Funcionalidades implementadas

- Página de inicio provisional que confirma visualmente que el setup
  (Next.js + TypeScript + Tailwind + Prisma) funciona.
- Cambio de tema claro/oscuro disponible a nivel de infraestructura
  (`ThemeProvider`), aunque el selector visual se construirá en la Fase 3.
- Conexión funcional a base de datos SQLite mediante Prisma, con un modelo
  de verificación (`HealthCheck`) y un seed de prueba.

## Arquitectura utilizada

Clean Architecture por capas sobre Next.js App Router:

```
UI (app/, components/)
   ↓
Application (features/, hooks/)
   ↓
Domain (types/, lib/validations)
   ↓
Infrastructure (repository/, services/, prisma/)
```

Principios aplicados: SOLID, DRY, KISS, Repository Pattern (carpeta
`repository/` reservada desde ya, se poblará en la Fase 2 en adelante).

## Tecnologías empleadas

- Next.js 14.2.5 (App Router)
- React 18.3.1 + TypeScript 5.5.4
- Tailwind CSS 3.4.9 + PostCSS + Autoprefixer
- Prisma ORM 5.18.0 + SQLite
- next-themes 0.3.0 (modo oscuro/claro)
- clsx + tailwind-merge (utilidad `cn()`)
- ESLint (config `next/core-web-vitals`)

## Estructura de carpetas

```
cybersecurity-edu/
├── app/
│   ├── api/            (vacío, reservado)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/             (vacío, reservado)
│   ├── layout/
│   │   └── theme-provider.tsx
│   └── shared/         (vacío, reservado)
├── features/            (subcarpetas por dominio, vacías, reservadas)
├── hooks/               (vacío, reservado)
├── lib/
│   ├── constants.ts
│   ├── prisma.ts
│   ├── utils.ts
│   └── validations/     (vacío, reservado)
├── services/            (vacío, reservado)
├── repository/          (vacío, reservado)
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── types/
│   └── index.ts
├── public/              (vacío, reservado)
├── styles/              (vacío, reservado)
├── config/              (vacío, reservado)
├── scripts/             (vacío, se poblará en Fase 10 con los .bat)
├── docs/
│   ├── 00-INDICE.md
│   ├── 01-FASE-1.md
│   └── CHANGELOG.md
├── middleware.ts
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── .eslintrc.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Archivos creados

| Archivo | Propósito |
|---|---|
| `package.json` | Dependencias y scripts del proyecto |
| `tsconfig.json` | Configuración de TypeScript |
| `next.config.mjs` | Configuración de Next.js + headers de seguridad base |
| `tailwind.config.ts` | Configuración de Tailwind (modo oscuro por clase) |
| `postcss.config.js` | Configuración de PostCSS |
| `.eslintrc.json` | Configuración de ESLint |
| `.gitignore` | Exclusiones de Git |
| `.env.example` | Plantilla de variables de entorno |
| `prisma/schema.prisma` | Schema inicial (modelo `HealthCheck` de verificación) |
| `prisma/seed.ts` | Seed de prueba de conexión a la base de datos |
| `lib/prisma.ts` | Cliente Prisma en patrón singleton |
| `lib/utils.ts` | Utilidad `cn()` para combinar clases Tailwind |
| `lib/constants.ts` | Constantes globales (nombre del sitio, enlaces de navegación) |
| `types/index.ts` | Tipos globales base (`Theme`, `NavLink`) |
| `middleware.ts` | Middleware placeholder (protección de rutas en Fase 5) |
| `app/globals.css` | Estilos globales + variables de tema |
| `app/layout.tsx` | Layout raíz con metadata y `ThemeProvider` |
| `app/page.tsx` | Página de inicio provisional de verificación |
| `components/layout/theme-provider.tsx` | Proveedor de tema claro/oscuro |
| `README.md` | Instrucciones de instalación y ejecución |
| `docs/00-INDICE.md` | Índice general del proyecto |
| `docs/01-FASE-1.md` | Este documento |
| `docs/CHANGELOG.md` | Registro de cambios del proyecto |

## Archivos modificados

Ninguno (proyecto inicial, no existían archivos previos).

## Componentes desarrollados

- `ThemeProvider` (`components/layout/theme-provider.tsx`): envuelve la
  aplicación para habilitar el cambio de tema claro/oscuro/sistema.

## Base de datos

**Tablas creadas:**

| Modelo | Campos | Propósito |
|---|---|---|
| `HealthCheck` | `id`, `status`, `createdAt` | Verificar que la conexión y las migraciones funcionan antes de construir el modelo real |

**Relaciones:** Ninguna en esta fase (modelo único de verificación).

**Migraciones:** Se generan al ejecutar `npx prisma migrate dev --name init`
localmente (no se ejecutó en este entorno por no tener acceso a red; el
usuario debe correrlo en su máquina).

**Modelos Prisma:** Definidos en `prisma/schema.prisma`, usando
`provider = "sqlite"` para desarrollo local, fácilmente migrable a
`postgresql` en fases posteriores.

## APIs implementadas

Ninguna todavía. La carpeta `app/api/` está creada y reservada.

## Hooks creados

Ninguno todavía. La carpeta `hooks/` está creada y reservada.

## Utilidades creadas

- `cn()` en `lib/utils.ts`: combina clases de Tailwind resolviendo
  conflictos (basado en `clsx` + `tailwind-merge`).

## Dependencias instaladas

**Producción:**
`next`, `react`, `react-dom`, `@prisma/client`, `zod`, `clsx`,
`tailwind-merge`, `next-themes`, `lucide-react`.

**Desarrollo:**
`typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `prisma`,
`tsx`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint`,
`eslint-config-next`.

> Nota: las dependencias están declaradas en `package.json` pero no se
> ejecutó `npm install` en este entorno (sin acceso a red). Debe ejecutarse
> localmente.

## Variables de entorno

| Variable | Descripción | Valor en Fase 1 |
|---|---|---|
| `DATABASE_URL` | Cadena de conexión de la base de datos | `file:./dev.db` (SQLite) |
| `AUTH_SECRET` | Secreto para autenticación | Vacío (se configura en Fase 5) |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio | `http://localhost:3000` |

## Scripts .bat creados o modificados

Ninguno todavía. Se implementarán en la Fase 10.

## Configuración realizada

- Modo oscuro activado por clase CSS (`darkMode: 'class'` en Tailwind).
- Headers de seguridad base en `next.config.mjs` (`X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`); se ampliarán en la Fase 10 con el
  resto de recomendaciones OWASP.
- Alias de importación `@/*` configurado en `tsconfig.json`.

## Capturas o diagramas

No aplica en esta fase (sin interfaz visual definitiva todavía).

## Decisiones técnicas tomadas

1. **SQLite en lugar de Supabase/PostgreSQL para esta fase**, por decisión
   explícita del usuario, priorizando desarrollo 100% local sin
   dependencias externas. La migración a PostgreSQL/Supabase será trivial
   gracias al Repository Pattern y a que solo cambia el `datasource` de
   Prisma.
2. **Patrón singleton para el cliente de Prisma**, estándar en proyectos
   Next.js, para evitar múltiples conexiones durante el hot-reload en
   desarrollo.
3. **next-themes en lugar de una implementación manual de dark mode**, por
   ser la solución estándar de la comunidad Next.js, evita parpadeo de
   tema (FOUC) y es compatible con SSR.
4. **Modelo `HealthCheck` temporal**, se elimina en la Fase 2 al introducir
   el modelo de datos real.

## Problemas encontrados

- El entorno de desarrollo usado para generar los archivos no tiene acceso
  a internet, por lo que no fue posible ejecutar `npm install` ni
  `npx prisma migrate dev` de forma automática.

## Soluciones aplicadas

- Se documentaron en el `README.md` los comandos exactos que el usuario
  debe ejecutar localmente para completar la instalación y verificar que
  el proyecto funciona.

## Mejoras realizadas

No aplica (primera fase).

## Pruebas ejecutadas

- Ninguna prueba automatizada todavía (se implementarán progresivamente;
  el script `ejecutar_pruebas.bat` y el framework de testing se definirán
  más adelante).
- Verificación manual pendiente por parte del usuario: correr `npm run dev`
  y confirmar que se muestra la pantalla de éxito en `localhost:3000`.

## Resultado esperado

Al ejecutar `npm install` y `npm run dev`, el usuario debe ver en
`http://localhost:3000` un mensaje confirmando que Next.js, TypeScript,
Tailwind y Prisma (SQLite) están correctamente configurados.

## Cómo ejecutar esta fase

```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Pendientes para la siguiente fase

- Diseñar el modelo de datos completo: usuarios, roles, permisos,
  artículos, categorías, noticias, glosario, FAQ, evaluaciones, preguntas,
  respuestas, resultados, certificados, recursos, configuración del sitio,
  banners, menús.
- Definir relaciones, índices y restricciones.
- Generar las migraciones correspondientes.
- Poblar `prisma/seed.ts` con datos reales de ejemplo (categorías base,
  rol de administrador, etc.).
