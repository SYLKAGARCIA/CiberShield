-- AlterTable
ALTER TABLE "evaluaciones" ADD COLUMN "categoriaId" TEXT;

-- CreateIndex
CREATE INDEX "evaluaciones_categoriaId_idx" ON "evaluaciones"("categoriaId");

-- AddForeignKey
ALTER TABLE "evaluaciones" ADD CONSTRAINT "evaluaciones_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
