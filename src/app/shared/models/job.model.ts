export interface JobModel {
  id: number; // Identificador único del trabajo
  company: string; // Nombre de la empresa
  logo: string; // URL del logo de la empresa
  new: boolean; // Indica si el trabajo es nuevo
  featured: boolean; // Indica si el trabajo es destacado
  position: string; // Posición del trabajo
  role: string; // Rol del trabajo
  level: string; // Nivel del trabajo
  postedAt: string; // Fecha en que se publicó el trabajo
  contract: string; // Tipo de contrato del trabajo
  location: string; // Ubicación del trabajo
  languages?: string[] | undefined | null; // Lenguajes requeridos para el trabajo
  tools?: string[] | undefined | null; // Herramientas requeridas para el trabajo
}
