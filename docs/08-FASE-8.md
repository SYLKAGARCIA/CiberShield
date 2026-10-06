# Fase 8 — Evaluaciones y Certificados

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado (alcance ajustado, ver notas) | 100% | 2026-08-04 | 2026-08-04 |

## Objetivos

- Implementar el sistema formal de evaluaciones: preguntas de opción
  múltiple, puntaje mínimo para aprobar, y calificación **calculada en
  el servidor** (nunca confiando en el cliente).
- Emitir certificados en PDF automáticamente al aprobar, con un código
  de verificación pública.
- Habilitar el registro de estudiantes, ya que `ResultadoEvaluacion` y
  `Certificado` requieren un `User` real — hasta la Fase 5 solo existía
  login para personal `ADMIN`/`EDITOR`.
- Construir el panel administrativo de Evaluaciones (con gestión
  anidada de preguntas y opciones) y un listado de certificados
  emitidos.

## Alcance ajustado

Se prioriza el flujo completo (registro → login → tomar evaluación →
calificación real → certificado descargable → verificación pública)
sobre funcionalidades secundarias del brief original:

- **Insignias/gamificación** (`Insignia`, `UsuarioInsignia`, ya
  definidos desde la Fase 2): no se construyó su UI en esta fase.
- **Edición de preguntas existentes**: el admin puede agregar y
  eliminar preguntas, pero no editarlas in-place (para editar, se
  elimina y se vuelve a crear).
- **Preguntas de tipo `OPCION_MULTIPLE` (varias respuestas correctas)
  o `VERDADERO_FALSO` con UI dedicada**: el formulario admin siempre
  pide 4 opciones con una sola correcta (`OPCION_UNICA`, el valor por
  defecto del campo `Pregunta.tipo`); verdadero/falso puede lograrse
  usando solo 2 de las 4 opciones.

## Funcionalidades implementadas

### Autenticación extendida
- **`/registro`**: registro público de estudiantes (rol `ESTUDIANTE`,
  sembrado desde la Fase 2), con inicio de sesión automático tras
  registrarse.
- `/login` actualizado: ya no es solo "acceso al panel", ahora sirve
  tanto a estudiantes como a personal `ADMIN`/`EDITOR`, redirigiendo a
  `/admin` o `/evaluaciones` según el rol.

### Flujo público de evaluación
- **`/evaluaciones`**: listado de evaluaciones activas.
- **`/evaluaciones/[id]`**: introducción (preguntas, puntaje mínimo) y
  botón para comenzar (o invitación a registrarse/iniciar sesión).
- **`/evaluaciones/[id]/realizar`**: formulario del quiz, protegido
  (requiere sesión).
- **`/evaluaciones/[id]/resultado/[resultadoId]`**: resultado, con
  descarga del certificado si aprobó. Verificado que el resultado
  pertenezca al usuario con sesión activa antes de mostrarlo.

### Certificados
- Generación de PDF con `pdf-lib` (código nuevo en
  `lib/certificado-pdf.ts`), guardado en `public/certificados/` (nueva
  dependencia, necesaria para este requisito explícito del brief).
- **`/certificados/verificar`**: formulario público para verificar por
  código.
- **`/certificados/[codigo]`**: página de verificación pública (nombre,
  evaluación, fecha).

### Panel administrativo
- **`/admin/evaluaciones`**: listado, crear, eliminar (solo si no tiene
  resultados registrados).
- **`/admin/evaluaciones/[id]`**: hub de gestión — edita datos
  generales y administra sus preguntas (agregar/eliminar).
- **`/admin/evaluaciones/[id]/preguntas/nueva`**: formulario de nueva
  pregunta (4 opciones, se marca la correcta).
- **`/admin/certificados`**: listado de solo lectura de certificados
  emitidos, con enlace a la verificación pública de cada uno.

## Arquitectura utilizada

**La calificación ocurre 100% en el servidor.** La Server Action
`enviarEvaluacion` (`app/evaluaciones/[id]/actions.ts`) vuelve a
consultar la base de datos para saber cuál opción de cada pregunta es
la correcta, y compara contra lo enviado en el formulario — nunca
confía en un puntaje que pudiera venir manipulado desde el navegador.

El certificado se emite en dos pasos porque su nombre de archivo debe
coincidir con su código de verificación, que Prisma genera recién al
insertar el registro:

```
1. certificadoRepository.create({usuarioId, resultadoId})
   → Prisma genera `codigo` (cuid) automáticamente
2. generarCertificadoPDF({ ...datos, codigo })  → bytes del PDF
3. guardarCertificadoPDF(codigo, bytes)          → public/certificados/{codigo}.pdf
4. certificadoRepository.actualizarPdfUrl(id, url)
```

## Tecnologías empleadas

- **`pdf-lib`** (nueva dependencia): generación de PDF en JavaScript
  puro, sin binarios nativos — funciona igual en desarrollo local y en
  la mayoría de entornos de despliegue Node.js.
- Módulo `fs/promises` de Node.js para guardar el PDF en disco.

## Estructura de carpetas

```
cybersecurity-edu/
├── app/
│   ├── registro/page.tsx
│   ├── api/auth/registro/route.ts
│   ├── evaluaciones/
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   ├── page.tsx
│   │   │   ├── actions.ts
│   │   │   ├── realizar/page.tsx
│   │   │   └── resultado/[resultadoId]/page.tsx
│   ├── certificados/
│   │   ├── page.tsx
│   │   ├── verificar/page.tsx
│   │   └── [codigo]/page.tsx
│   └── admin/
│       ├── evaluaciones/{actions.ts, evaluacion-form.tsx, pregunta-form.tsx, page.tsx, nueva/, [id]/{page.tsx, preguntas/nueva/}}
│       └── certificados/page.tsx
├── components/auth/registro-form.tsx
├── lib/
│   ├── certificado-pdf.ts
│   ├── certificado-storage.ts
│   └── validations/{registro,evaluacion,pregunta}.schema.ts
├── repository/
│   ├── evaluacion.repository.ts
│   ├── pregunta.repository.ts
│   ├── resultado-evaluacion.repository.ts
│   └── certificado.repository.ts
```

## Archivos creados

Ver árbol completo arriba (27 archivos nuevos) + `docs/08-FASE-8.md`.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `package.json` | Se agrega `pdf-lib` |
| `app/login/page.tsx` | Copy actualizado (ya no es solo para personal admin); enlace a `/registro` |
| `app/api/auth/login/route.ts` | `redirectTo` ahora apunta a `/evaluaciones` para no-admin (antes `/`) |
| `components/admin/admin-sidebar.tsx` | Se agregan "Evaluaciones" y "Certificados" |
| `app/admin/page.tsx` | Dashboard con conteos de Evaluaciones y Certificados |
| `repository/certificado.repository.ts` | Se agrega `findAllParaAdmin()` |
| `prisma/seed.ts` | "Evaluaciones" agregado al menú; nueva evaluación de ejemplo con 5 preguntas |
| `components/layout/footer.tsx` | "Evaluaciones" agregado a la columna "Aprende" |
| `docs/00-INDICE.md` | Progreso actualizado a 8/10 fases (80%) |
| `docs/CHANGELOG.md` | Nueva entrada de versión 0.8.0 |

## Base de datos

Sin cambios en el schema — se usan íntegramente los modelos
`Evaluacion`, `Pregunta`, `OpcionRespuesta`, `ResultadoEvaluacion` y
`Certificado`, ya definidos desde la Fase 2. Seed ampliado con una
evaluación de ejemplo ("Fundamentos de Ciberseguridad", 5 preguntas,
70% para aprobar).

## APIs implementadas

- `POST /api/auth/registro`: crea un usuario con rol `ESTUDIANTE` e
  inicia sesión automáticamente.

## Hooks creados

Ninguno propio.

## Utilidades creadas

- `lib/certificado-pdf.ts`: `generarCertificadoPDF()`.
- `lib/certificado-storage.ts`: `guardarCertificadoPDF()`.

## Dependencias instaladas

- `pdf-lib` (^1.17.1): generación de certificados en PDF. Requisito
  explícito del brief original ("Certificados automáticos en PDF").

## Variables de entorno

Sin cambios.

## Scripts .bat creados o modificados

Ninguno en esta fase.

## Configuración realizada

Ninguna configuración de proyecto adicional.

## Decisiones técnicas tomadas

1. **Registro público de estudiantes en la Fase 8, no en la Fase 5**:
   la Fase 5 se enfocó en autenticación de personal
   (`ADMIN`/`EDITOR`) porque era prerrequisito del panel administrativo
   de la Fase 6. Recién en esta fase se vuelve necesario que
   estudiantes reales tengan cuenta, ya que el schema vincula
   `ResultadoEvaluacion`/`Certificado` a un `User`.
2. **Calificación recalculada en el servidor, ignorando cualquier dato
   de puntaje que pudiera venir del cliente**: es la única forma de
   evitar que alguien apruebe una evaluación manipulando el HTML/JS del
   navegador. El formulario ni siquiera envía un puntaje — solo qué
   opción se marcó por pregunta; todo el cálculo ocurre en
   `enviarEvaluacion`.
3. **Certificado creado en dos pasos (registro en BD → generar PDF con
   el código ya asignado)**: el código de verificación pública
   (`Certificado.codigo`) lo genera Prisma automáticamente
   (`@default(cuid())`) recién al insertar. Generar el PDF antes
   habría significado no poder nombrarlo con su propio código de
   verificación.
4. **Fallo en la generación del PDF no revierte el resultado ni el
   certificado**: si `pdf-lib` o el sistema de archivos fallan (ver
   nota de despliegue abajo), el `Certificado` igual queda registrado
   con su código válido — el estudiante puede verificarlo en
   `/certificados/[codigo]` aunque falte el PDF descargable, y el
   error se registra en el log del servidor para que el administrador
   lo note.
5. **`pdf-lib` en vez de Puppeteer/`@react-pdf/renderer`**: JavaScript
   puro, sin necesidad de un navegador headless ni de binarios
   nativos — más liviano y más compatible con entornos serverless.
6. **Preguntas simplificadas a 4 opciones fijas con una correcta** en
   el formulario admin, en vez de un editor de opciones dinámico
   (agregar/quitar filas): cubre la gran mayoría de casos de uso de un
   quiz educativo con mucho menos código y complejidad de UI.

## Problemas encontrados

1. **El sandbox de este entorno se reinició a mitad de esta fase**,
   perdiendo el trabajo hecho hasta ese punto (dependencia `pdf-lib`,
   flujo de registro, los 4 repositorios nuevos, generador de PDF).
   Se detectó de inmediato al fallar una operación de archivo con
   "No such file or directory", se restauró el proyecto desde el
   último `.zip` entregado (Fase 7) y se reconstruyó todo lo perdido
   antes de continuar con el resto de la fase.
2. **Limitación conocida de despliegue**: `guardarCertificadoPDF()`
   escribe el PDF directamente al disco
   (`public/certificados/{codigo}.pdf`). Esto funciona en desarrollo
   local y en servidores Node.js tradicionales, pero **Vercel tiene un
   sistema de archivos de solo lectura** (salvo `/tmp`, que no persiste
   entre invocaciones). Si este proyecto se despliega en Vercel, este
   servicio deberá cambiarse para subir el PDF a un almacenamiento
   externo (Vercel Blob, S3, etc.) en vez de al disco local.

## Soluciones aplicadas

1. Se restauró el proyecto completo desde el `.zip` de la Fase 7
   (disponible en `/mnt/user-data/outputs/`) y se reconstruyeron, en
   orden, todos los archivos perdidos, verificando al final que
   coincidieran exactamente con lo planeado originalmente.
2. Se documentó explícitamente la limitación de Vercel en el propio
   código (`lib/certificado-storage.ts`) y aquí, para que quede
   registrada antes de un eventual despliegue en producción, no
   después de que falle silenciosamente.
3. Se verificó que cada archivo `'use server'` nuevo solo exportara
   funciones `async` (lección de la Fase 6), y se verificó el balance
   de llaves/paréntesis/corchetes en los 162 archivos `.ts`/`.tsx`
   relevantes del proyecto.
4. Se comparó cada nombre de campo usado en los repositorios y Server
   Actions nuevos contra `prisma/schema.prisma` línea por línea.

## Mejoras realizadas

- Se corrigió una tercera instancia de llamada directa a Prisma
  (`app/admin/certificados/page.tsx` originalmente), agregando
  `certificadoRepository.findAllParaAdmin()` en su lugar.

## Pruebas ejecutadas

- Verificación manual de sintaxis, balance, y coincidencia de campos.
- Pendiente de ejecutar por el usuario:
  ```bash
  scripts\crear_base_datos.bat
  scripts\iniciar_proyecto.bat
  ```
  Flujo completo a probar: registrarse en `/registro` → ir a
  `/evaluaciones` → tomar "Fundamentos de Ciberseguridad" → responder
  (al menos 4 de 5 correctas para aprobar con 70%+) → confirmar que se
  genera el PDF y se puede descargar → verificar el código en
  `/certificados/verificar`.

## Resultado esperado

Un estudiante nuevo debe poder registrarse, tomar la evaluación de
ejemplo, y si aprueba, descargar un PDF con su nombre, el título de la
evaluación, su puntaje y un código de verificación único. Ese mismo
código, buscado en `/certificados/verificar`, debe mostrar los mismos
datos públicamente.

## Cómo ejecutar esta fase

```bash
scripts\crear_base_datos.bat
scripts\iniciar_proyecto.bat
```

## Pendientes para la siguiente fase

- Fase 9 (SEO, accesibilidad y PWA) es la siguiente en el roadmap.
- Si se solicita explícitamente: UI de Insignias (gamificación),
  edición in-place de preguntas, soporte de `OPCION_MULTIPLE`, y
  adaptar `certificado-storage.ts` para almacenamiento externo si el
  proyecto se despliega en Vercel.
