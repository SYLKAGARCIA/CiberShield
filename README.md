# CiberShield UTLVT

Plataforma web educativa de la UTLVT para la concientización de
estudiantes en ciberseguridad.

**Proyecto universitario** — Fase 1: Setup base.

## Stack tecnológico

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (con soporte modo oscuro/claro vía `next-themes`)
- Prisma ORM + PostgreSQL en Supabase

> La base de datos definitiva del proyecto es **PostgreSQL en Supabase**.
> Prisma se encarga de acceder a las tablas y relaciones desde el servidor de Next.js.
> `DATABASE_URL` usa el pooler de Supabase para la aplicación y `DIRECT_URL` se usa
> para las migraciones de Prisma.

## Requisitos previos

- Node.js 18.18 o superior ([descargar aquí](https://nodejs.org))
- npm (viene incluido con Node.js)
- Git

Verifica tus versiones:
```bash
node -v
npm -v
git --version
```

## Instalación (paso a paso)

1. Descomprime el proyecto y abre la carpeta en VS Code.

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea tu archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
   (En Windows: `copy .env.example .env`)

4. Configura Supabase:
   ```bash
   copy .env.example .env
   ```
   Abre `.env` y reemplaza `TU_PASSWORD` por la contraseña de la base de datos de tu proyecto Supabase.

5. Genera el cliente Prisma:
   ```bash
   npx prisma generate
   ```

6. Crea las tablas en Supabase con la migración inicial:
   ```bash
   npx prisma migrate deploy
   ```

7. Carga los datos iniciales del proyecto:
   ```bash
   npm run prisma:seed
   ```

8. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

7. Abre [http://localhost:3000](http://localhost:3000) — deberías ver la
   pantalla de confirmación "✅ Setup Next.js + TypeScript + Tailwind +
   Prisma (PostgreSQL/Supabase) OK".

9. (Opcional) Explora la base de datos visualmente:
   ```bash
   npm run prisma:studio
   ```

## Estructura del proyecto

Ver el árbol completo de carpetas en `docs/` (se documentará en fases
posteriores). Resumen rápido:

- `app/` — rutas de Next.js (App Router)
- `components/` — componentes de UI reutilizables
- `features/` — lógica agrupada por dominio (auth, artículos, evaluaciones...)
- `repository/` — capa de acceso a datos (Repository Pattern sobre Prisma)
- `services/` — lógica de negocio
- `lib/` — utilidades, validaciones, cliente de Prisma
- `prisma/` — schema, migraciones y seed de la base de datos

## Estado del proyecto

- [x] Fase 1 — Setup base (Next.js, TypeScript, Tailwind, Prisma/PostgreSQL/Supabase)
- [ ] Fase 2 — Modelo de datos completo
- [ ] Fase 3 — Layout público y diseño (modo oscuro/claro)
- [ ] Fase 4 — Contenido educativo
- [ ] Fase 5 — Autenticación y roles
- [ ] Fase 6 — Panel administrativo
- [ ] Fase 7 — Herramientas interactivas
- [ ] Fase 8 — Evaluaciones y certificados PDF
- [ ] Fase 9 — SEO, accesibilidad y PWA
- [ ] Fase 10 — Optimización, seguridad OWASP, scripts .bat y documentación final
