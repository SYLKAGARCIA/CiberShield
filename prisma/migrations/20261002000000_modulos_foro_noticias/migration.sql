-- Clasificación de noticias
ALTER TABLE "publicaciones" ADD COLUMN IF NOT EXISTS "clasificacion" TEXT;

-- Progreso de módulos
CREATE TABLE IF NOT EXISTS "progreso_modulos" (
    "usuarioId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "completadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "progreso_modulos_pkey" PRIMARY KEY ("usuarioId","categoriaId")
);
CREATE INDEX IF NOT EXISTS "progreso_modulos_categoriaId_idx" ON "progreso_modulos"("categoriaId");
ALTER TABLE "progreso_modulos" ADD CONSTRAINT "progreso_modulos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "progreso_modulos" ADD CONSTRAINT "progreso_modulos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Foro
CREATE TABLE IF NOT EXISTS "foro_hilos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "foro_hilos_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "foro_hilos_autorId_idx" ON "foro_hilos"("autorId");
ALTER TABLE "foro_hilos" ADD CONSTRAINT "foro_hilos_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "foro_respuestas" (
    "id" TEXT NOT NULL,
    "hiloId" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "foro_respuestas_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "foro_respuestas_hiloId_idx" ON "foro_respuestas"("hiloId");
CREATE INDEX IF NOT EXISTS "foro_respuestas_autorId_idx" ON "foro_respuestas"("autorId");
ALTER TABLE "foro_respuestas" ADD CONSTRAINT "foro_respuestas_hiloId_fkey" FOREIGN KEY ("hiloId") REFERENCES "foro_hilos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "foro_respuestas" ADD CONSTRAINT "foro_respuestas_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
