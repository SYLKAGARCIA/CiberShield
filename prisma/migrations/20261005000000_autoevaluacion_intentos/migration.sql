-- Intentos de autoevaluación (comparación inicial vs final)
CREATE TABLE IF NOT EXISTS "intentos_autoevaluacion" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "aciertos" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "porcentaje" INTEGER NOT NULL,
    "detalle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "intentos_autoevaluacion_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "intentos_autoevaluacion_usuarioId_idx" ON "intentos_autoevaluacion"("usuarioId");
ALTER TABLE "intentos_autoevaluacion" ADD CONSTRAINT "intentos_autoevaluacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
