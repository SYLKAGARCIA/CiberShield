# Fase 2 — Modelo de Datos Completo

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado | 100% | 2026-08-03 | 2026-08-03 |

## Objetivos

- Diseñar y modelar en Prisma todas las entidades necesarias para el
  proyecto: usuarios, roles, permisos, publicaciones (artículos/noticias),
  categorías, glosario, FAQ, recursos, evaluaciones, preguntas, opciones
  de respuesta, resultados, certificados, insignias, configuración del
  sitio, banners, menús y contenido de inicio.
- Aplicar buenas prácticas de normalización, índices y restricciones.
- Sentar las bases del **Repository Pattern** con implementaciones de
  referencia.
- Poblar la base de datos con datos iniciales reales mediante el seed.

## Funcionalidades implementadas

- Modelo de datos completo y relacional en `prisma/schema.prisma`.
- Seed funcional que crea: roles y permisos, un usuario administrador,
  categorías base, un término de glosario, una FAQ, la configuración
  general del sitio, el contenido de inicio y los ítems de menú
  (header/footer).
- Dos repositorios de referencia (`CategoriaRepository`,
  `UsuarioRepository`) que implementan el contrato genérico
  `Repository<T>`.
- Dos esquemas de validación Zod de referencia (`categoriaSchema`,
  `usuarioSchema`).

## Arquitectura utilizada

Se mantiene Clean Architecture por capas. Esta fase construye
principalmente la capa de **Infraestructura** (`prisma/`, `repository/`)
y sienta las bases de la capa de **Dominio** (`lib/validations/`).

```
UI (app/, components/)              ← sin cambios en esta fase
   ↓
Application (features/, hooks/)     ← sin cambios en esta fase
   ↓
Domain (types/, lib/validations/)   ← se agregan esquemas Zod de referencia
   ↓
Infrastructure (repository/, prisma/) ← foco de esta fase
```

## Tecnologías empleadas

- Prisma ORM 5.18.0 (sin cambios de versión respecto a Fase 1)
- SQLite (persistencia local, decisión de Fase 1)
- Zod 3.23.8 (validaciones)
- bcryptjs 2.4.3 (hash de contraseñas — se agrega en esta fase, se
  usará activamente en la Fase 5 de autenticación)

## Estructura de carpetas

Cambios respecto a la Fase 1 (carpetas que dejan de estar vacías):

```
cybersecurity-edu/
├── prisma/
│   ├── schema.prisma      (reescrito por completo)
│   └── seed.ts            (reescrito por completo)
├── repository/
│   ├── categoria.repository.ts   (nuevo)
│   └── usuario.repository.ts     (nuevo)
├── lib/
│   └── validations/
│       ├── categoria.schema.ts   (nuevo)
│       └── usuario.schema.ts     (nuevo)
├── types/
│   └── repository.ts             (nuevo)
```

## Archivos creados

| Archivo | Propósito |
|---|---|
| `repository/categoria.repository.ts` | Repositorio de referencia para Categorías |
| `repository/usuario.repository.ts` | Repositorio de referencia para Usuarios |
| `lib/validations/categoria.schema.ts` | Validación Zod de Categoría |
| `lib/validations/usuario.schema.ts` | Validación Zod de Usuario |
| `types/repository.ts` | Contrato genérico `Repository<T>` |
| `docs/02-FASE-2.md` | Este documento |

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `prisma/schema.prisma` | Reemplazo total: de un modelo `HealthCheck` de verificación a 20 modelos que cubren todo el dominio del proyecto (revisado tras corrección de compatibilidad con SQLite, ver "Problemas encontrados") |
| `prisma/seed.ts` | Reemplazo total: ahora crea datos reales (roles, permisos, usuario admin, categorías, glosario, FAQ, configuración, menús, contenido de inicio) |
| `package.json` | Se agregan `bcryptjs` y `@types/bcryptjs` |
| `docs/00-INDICE.md` | Progreso actualizado a 2/10 fases (20%) |
| `docs/CHANGELOG.md` | Nueva entrada de versión 0.2.0 |

## Componentes desarrollados

No aplica en esta fase (sin UI nueva; el modelo de datos no tiene
representación visual todavía).

## Base de datos

### Tablas creadas (20 modelos)

| Modelo | Tabla (`@@map`) | Propósito |
|---|---|---|
| `Role` | `roles` | Roles del sistema (ADMIN, EDITOR, ESTUDIANTE) |
| `Permission` | `permissions` | Catálogo de permisos granulares |
| `RolePermission` | `role_permissions` | Tabla puente Role ↔ Permission (M:N) |
| `User` | `users` | Usuarios de la plataforma |
| `Categoria` | `categorias` | Categorías compartidas entre publicaciones y recursos |
| `Publicacion` | `publicaciones` | Artículos y noticias (unificados, ver decisión técnica) |
| `TerminoGlosario` | `glosario` | Términos del glosario de ciberseguridad |
| `PreguntaFrecuente` | `faq` | Preguntas frecuentes |
| `Recurso` | `recursos` | Recursos descargables (PDF, video, enlace, imagen) |
| `Evaluacion` | `evaluaciones` | Evaluaciones/quiz |
| `Pregunta` | `preguntas` | Preguntas de una evaluación |
| `OpcionRespuesta` | `opciones_respuesta` | Opciones de respuesta de una pregunta |
| `ResultadoEvaluacion` | `resultados_evaluacion` | Resultado de un usuario en una evaluación |
| `Certificado` | `certificados` | Certificado emitido al aprobar una evaluación |
| `Insignia` | `insignias` | Catálogo de insignias (gamificación) |
| `UsuarioInsignia` | `usuario_insignias` | Tabla puente User ↔ Insignia (M:N) |
| `Configuracion` | `configuracion` | Configuración general del sitio (singleton) |
| `Banner` | `banners` | Banners/carruseles (agrupables por campo `grupo`) |
| `ItemMenu` | `items_menu` | Ítems de menú de header/footer (con submenús) |
| `ContenidoInicio` | `contenido_inicio` | Contenido editable de la home (singleton) |

### Relaciones

- `Role` 1:N `User`
- `Role` M:N `Permission` (vía `RolePermission`)
- `User` 1:N `Publicacion` (autor)
- `Categoria` 1:N `Publicacion`
- `Categoria` 1:N `Recurso` (opcional)
- `Evaluacion` 1:N `Pregunta`
- `Pregunta` 1:N `OpcionRespuesta`
- `User` 1:N `ResultadoEvaluacion`
- `Evaluacion` 1:N `ResultadoEvaluacion`
- `ResultadoEvaluacion` 1:1 `Certificado`
- `User` M:N `Insignia` (vía `UsuarioInsignia`)
- `ItemMenu` 1:N `ItemMenu` (self-relation, para submenús)

### Migraciones

No se generaron en este entorno (sin acceso a red ni a un runtime de
Prisma instalado). El usuario debe ejecutar localmente:

```bash
npx prisma migrate dev --name modelo_completo
```

Esto generará la carpeta `prisma/migrations/` con el SQL correspondiente.

### Modelos Prisma

Definidos íntegramente en `prisma/schema.prisma` (ver archivo completo,
ya corregido para compatibilidad real con el conector SQLite — ver
"Problemas encontrados" más abajo). Balance final verificado: 22 llaves
de apertura/cierre, 20 modelos, 0 enums, 0 campos `Json`.

### Índices y restricciones

- `@unique` en: `Role.name`, `Permission.key`, `User.email`,
  `Categoria.slug`, `Publicacion.slug`, `TerminoGlosario.termino`,
  `Certificado.codigo`, `Certificado.resultadoId`.
- `@@index` en claves foráneas de alta consulta: `roleId`, `categoriaId`,
  `autorId`, `[tipo, publicado]`, `letra`, `evaluacionId`, `preguntaId`,
  `usuarioId`, `[grupo, activo]`, `ubicacion`.
- Claves primarias compuestas (`@@id`) en las tablas puente
  `RolePermission` y `UsuarioInsignia`, evitando duplicados en las
  relaciones M:N.
- `onDelete: Cascade` en relaciones de dependencia fuerte (ej. al borrar
  una `Evaluacion` se borran sus `Pregunta`; al borrar una `Pregunta` se
  borran sus `OpcionRespuesta`; al borrar un `ItemMenu` padre se borran
  sus hijos).

### Buenas prácticas de normalización

- Se evitó duplicar campos entre "Artículos" y "Noticias" unificándolos
  en `Publicacion` (ver decisión técnica más abajo).
- Las categorías son una tabla independiente reutilizada por
  `Publicacion` y `Recurso`, en lugar de repetir el campo como texto
  libre.
- Los permisos son atómicos y están desacoplados de los roles mediante
  una tabla puente, permitiendo cambiar qué puede hacer cada rol sin
  tocar código.

## APIs implementadas

Ninguna todavía (se implementan a partir de la Fase 6, panel
administrativo).

## Hooks creados

Ninguno todavía.

## Utilidades creadas

Ninguna nueva en esta fase (ver `lib/utils.ts` de la Fase 1).

## Dependencias instaladas

- `bcryptjs` (producción): hash de contraseñas.
- `@types/bcryptjs` (desarrollo): tipos de TypeScript para `bcryptjs`.

## Variables de entorno

Sin cambios respecto a la Fase 1 (`DATABASE_URL`, `AUTH_SECRET`,
`NEXT_PUBLIC_SITE_URL`).

## Scripts .bat creados o modificados

Ninguno en esta fase (ya entregados como adelanto de la Fase 10).
`crear_base_datos.bat` y `actualizar_proyecto.bat` son los que el usuario
debe ejecutar para aplicar este nuevo modelo de datos.

## Configuración realizada

Ninguna configuración de proyecto adicional (Next.js, Tailwind, etc.) en
esta fase; el trabajo fue exclusivamente de modelado de datos.

## Capturas o diagramas

No aplica (sin interfaz visual todavía). Se recomienda generar un
diagrama entidad-relación visual en la Fase 6, cuando el panel
administrativo consuma estos modelos.

## Decisiones técnicas tomadas

1. **Unificación de "Artículos" y "Noticias" en un solo modelo
   `Publicacion`** con un campo `tipo` (`ARTICULO` | `NOTICIA`). Ambos
   comparten exactamente los mismos campos (título, contenido, imagen,
   categoría, autor, SEO); modelarlos por separado hubiera duplicado la
   tabla y toda la lógica CRUD, violando DRY. El panel administrativo
   seguirá mostrando dos secciones separadas, filtrando por `tipo`.

2. **`Configuracion` y `ContenidoInicio` como singleton** (id fijo
   `"singleton"`), en lugar de una tabla con múltiples filas. Solo debe
   existir una configuración del sitio y un contenido de inicio; forzar
   el id evita registros duplicados accidentales y simplifica las
   consultas (`findUnique({ where: { id: 'singleton' } })` en vez de
   `findFirst()`).

3. **`Banner` con campo `grupo`** en lugar de un modelo separado por cada
   carrusel. Permite crear tantos carruseles como se necesite (hero de
   inicio, promociones laterales, etc.) reutilizando la misma tabla.

4. **Campo `respuestas` (`String`) en `ResultadoEvaluacion`**: guarda una
   fotografía de las respuestas exactas que dio el estudiante, serializada
   con `JSON.stringify()`, para auditoría y para poder mostrar la revisión
   del intento sin depender de que las preguntas no hayan cambiado
   después. Se usa `String` en lugar de `Json` porque **el conector
   SQLite de Prisma no soporta el tipo `Json`** (ver "Problemas
   encontrados"); la serialización/deserialización se hace en la capa de
   aplicación con `JSON.stringify()` / `JSON.parse()`.

5. **`bcryptjs` en lugar de `bcrypt`**: `bcryptjs` es una implementación
   en JavaScript puro sin dependencias nativas compiladas, lo cual es
   más simple de instalar y desplegar en Vercel sin binarios nativos.

6. **Permisos atómicos con tabla puente `RolePermission`** en lugar de un
   campo de texto o enum en `Role`. Esto permite, desde el futuro panel
   administrativo, activar o desactivar permisos individuales por rol
   sin tocar código ni ejecutar migraciones.

## Problemas encontrados

1. El entorno de generación no tiene acceso a red ni Prisma CLI
   preinstalado, por lo que no fue posible ejecutar `prisma validate` ni
   `prisma migrate dev` para confirmar automáticamente que el schema
   compila antes de entregarlo.
2. **Error real detectado al ejecutar `crear_base_datos.bat` en la
   máquina del usuario (P1012):** el schema original usaba `enum` (en
   `TipoContenido`, `TipoRecurso`, `TipoPregunta`, `UbicacionMenu`) y
   `Json` (en `ResultadoEvaluacion.respuestas` y
   `ContenidoInicio.seccionesJson`). **El conector de SQLite de Prisma no
   soporta ninguno de los dos tipos** (a diferencia de PostgreSQL/MySQL).
   Esto no fue detectado en la entrega original porque no se pudo validar
   el schema contra el conector real por falta de acceso a red.

## Soluciones aplicadas

1. Se realizó una verificación manual de sintaxis (conteo de llaves y
   paréntesis balanceados, listado de modelos y enums esperados) — esto
   confirmó que el schema era sintácticamente válido, pero **no** que
   fuera compatible con el conector SQLite, que es una validación
   semántica distinta que requiere el binario de Prisma.
2. Se reemplazaron los 4 `enum` por campos `String`, documentando en un
   comentario justo encima de cada campo los valores permitidos (ej.
   `tipo String // "ARTICULO" | "NOTICIA"`). La validación de que solo se
   usen esos valores pasa a ser responsabilidad de la capa de aplicación
   (Zod, en `lib/validations/`) en lugar de la base de datos.
3. Se reemplazaron los 2 campos `Json`/`Json?` por `String`/`String?`,
   documentando que deben guardar el resultado de `JSON.stringify()` y
   leerse con `JSON.parse()` desde el código que los consuma.
4. Se verificó que ningún archivo TypeScript ya escrito (`seed.ts`,
   repositorios, esquemas Zod) hiciera referencia a los tipos enum
   generados por Prisma — no fue necesario modificar código además del
   schema.

**Lección para las fases futuras:** dado que este entorno no tiene
acceso a Prisma CLI, cualquier característica de Prisma cuyo soporte
varíe según el conector (enums, Json, tipos nativos como `Decimal` o
arrays escalares) se documentará explícitamente aquí como "a confirmar
en máquina del usuario", y se preferirán por defecto los tipos con
soporte universal (`String`, `Int`, `Boolean`, `DateTime`) salvo que el
usuario confirme que ya validó el schema localmente.

## Mejoras realizadas

- Se estableció el patrón de repositorio con dos implementaciones
  completas de referencia, que servirán de plantilla para los
  repositorios de las 18 entidades restantes conforme se vayan
  necesitando en las fases de contenido y panel administrativo.

## Pruebas ejecutadas

- Ninguna prueba automatizada todavía. Verificación pendiente por parte
  del usuario:
  ```bash
  npx prisma format          # valida y formatea el schema
  npx prisma migrate dev --name modelo_completo
  npm run prisma:seed
  npx prisma studio          # inspección visual de los datos sembrados
  ```

## Resultado esperado

Al ejecutar las migraciones y el seed, Prisma Studio debe mostrar las 20
tablas pobladas según corresponda: 3 roles con sus permisos, 1 usuario
administrador, 7 categorías, 1 término de glosario, 1 FAQ, 1 fila de
configuración, 1 fila de contenido de inicio, y 10 ítems de menú (6 en
header, 4 en footer).

## Cómo ejecutar esta fase

```bash
scripts\crear_base_datos.bat
```

O manualmente:

```bash
npx prisma migrate dev --name modelo_completo
npx prisma generate
npm run prisma:seed
npx prisma studio
```

## Pendientes para la siguiente fase

- Construir el layout público (navbar con los ítems de `ItemMenu` de
  ubicación HEADER, footer con los de ubicación FOOTER).
- Implementar el selector visual de modo oscuro/claro.
- Aplicar la identidad visual definitiva (colores, tipografía) sobre la
  base ya configurada en Tailwind.
- Conectar la home (`app/page.tsx`) con el modelo `ContenidoInicio` y los
  `Banner` del grupo `home-hero`.
