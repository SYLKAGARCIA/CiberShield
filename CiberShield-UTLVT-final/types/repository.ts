/**
 * Contrato genérico que deben cumplir todos los repositorios.
 * Aísla a la capa de aplicación (features/, Server Actions) de los
 * detalles de Prisma: si en el futuro se cambia de ORM o de proveedor
 * de base de datos, solo se reescribe la implementación del
 * repositorio, no el código que lo consume.
 */
export interface Repository<T, CreateInput, UpdateInput> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: CreateInput): Promise<T>;
  update(id: string, data: UpdateInput): Promise<T>;
  delete(id: string): Promise<T>;
}
