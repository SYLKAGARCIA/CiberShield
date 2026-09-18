-- CiberShield UTLVT - esquema inicial para PostgreSQL/Supabase
-- Generado a partir del modelo Prisma actual.

-- La migración anterior creó HealthCheck; se elimina porque ya no forma parte del modelo.
DROP TABLE IF EXISTS "HealthCheck";

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    PRIMARY KEY ("roleId", "permissionId"),
    CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" TIMESTAMP(3),
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "publicaciones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumen" TEXT,
    "contenido" TEXT NOT NULL,
    "imagenPortada" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "publicadoEn" TIMESTAMP(3),
    "categoriaId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "metaTitulo" TEXT,
    "metaDescripcion" TEXT,
    "ogImagen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "publicaciones_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "publicaciones_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "glosario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "termino" TEXT NOT NULL,
    "definicion" TEXT NOT NULL,
    "letra" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "faq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "categoria" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "publicada" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "recursos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "categoriaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "recursos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "evaluaciones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "puntajeMinimo" INTEGER NOT NULL DEFAULT 70,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "preguntas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "evaluacionId" TEXT NOT NULL,
    "enunciado" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'OPCION_UNICA',
    "orden" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "preguntas_evaluacionId_fkey" FOREIGN KEY ("evaluacionId") REFERENCES "evaluaciones" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "opciones_respuesta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "preguntaId" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "esCorrecta" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "opciones_respuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "preguntas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "resultados_evaluacion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "evaluacionId" TEXT NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "aprobado" BOOLEAN NOT NULL,
    "respuestas" TEXT NOT NULL,
    "completadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resultados_evaluacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resultados_evaluacion_evaluacionId_fkey" FOREIGN KEY ("evaluacionId") REFERENCES "evaluaciones" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "certificados" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "resultadoId" TEXT NOT NULL,
    "archivoPdfUrl" TEXT,
    "emitidoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "certificados_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "certificados_resultadoId_fkey" FOREIGN KEY ("resultadoId") REFERENCES "resultados_evaluacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "insignias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "icono" TEXT,
    "criterio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "usuario_insignias" (
    "usuarioId" TEXT NOT NULL,
    "insigniaId" TEXT NOT NULL,
    "obtenidaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("usuarioId", "insigniaId"),
    CONSTRAINT "usuario_insignias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "usuario_insignias_insigniaId_fkey" FOREIGN KEY ("insigniaId") REFERENCES "insignias" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "configuracion" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "nombreSitio" TEXT NOT NULL DEFAULT 'CiberSeguridad Estudiantil',
    "descripcionSitio" TEXT,
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "emailContacto" TEXT,
    "telefonoContacto" TEXT,
    "direccion" TEXT,
    "facebookUrl" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "youtubeUrl" TEXT,
    "metaTituloDefault" TEXT,
    "metaDescripcionDefault" TEXT,
    "ogImagenDefault" TEXT,
    "googleAnalyticsId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "banners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grupo" TEXT NOT NULL,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagenUrl" TEXT NOT NULL,
    "enlaceUrl" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaInicio" TIMESTAMP(3),
    "fechaFin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "items_menu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "etiqueta" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "abrirEnNuevaPestana" BOOLEAN NOT NULL DEFAULT false,
    "padreId" TEXT,
    CONSTRAINT "items_menu_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "items_menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contenido_inicio" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "heroTitulo" TEXT NOT NULL DEFAULT 'Aprende a protegerte en el mundo digital',
    "heroSubtitulo" TEXT,
    "heroImagenUrl" TEXT,
    "heroCtaTexto" TEXT,
    "heroCtaUrl" TEXT,
    "seccionesJson" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_key_key" ON "permissions"("key");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_roleId_idx" ON "users"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_slug_key" ON "categorias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "publicaciones_slug_key" ON "publicaciones"("slug");

-- CreateIndex
CREATE INDEX "publicaciones_categoriaId_idx" ON "publicaciones"("categoriaId");

-- CreateIndex
CREATE INDEX "publicaciones_autorId_idx" ON "publicaciones"("autorId");

-- CreateIndex
CREATE INDEX "publicaciones_tipo_publicado_idx" ON "publicaciones"("tipo", "publicado");

-- CreateIndex
CREATE UNIQUE INDEX "glosario_termino_key" ON "glosario"("termino");

-- CreateIndex
CREATE INDEX "glosario_letra_idx" ON "glosario"("letra");

-- CreateIndex
CREATE INDEX "recursos_categoriaId_idx" ON "recursos"("categoriaId");

-- CreateIndex
CREATE INDEX "preguntas_evaluacionId_idx" ON "preguntas"("evaluacionId");

-- CreateIndex
CREATE INDEX "opciones_respuesta_preguntaId_idx" ON "opciones_respuesta"("preguntaId");

-- CreateIndex
CREATE INDEX "resultados_evaluacion_usuarioId_idx" ON "resultados_evaluacion"("usuarioId");

-- CreateIndex
CREATE INDEX "resultados_evaluacion_evaluacionId_idx" ON "resultados_evaluacion"("evaluacionId");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_codigo_key" ON "certificados"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_resultadoId_key" ON "certificados"("resultadoId");

-- CreateIndex
CREATE INDEX "certificados_usuarioId_idx" ON "certificados"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "insignias_nombre_key" ON "insignias"("nombre");

-- CreateIndex
CREATE INDEX "banners_grupo_activo_idx" ON "banners"("grupo", "activo");

-- CreateIndex
CREATE INDEX "items_menu_ubicacion_idx" ON "items_menu"("ubicacion");
