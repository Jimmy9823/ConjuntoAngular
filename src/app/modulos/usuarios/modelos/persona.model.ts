export interface Persona {
  id?: number; // Autogenerado por backend

  // Campos obligatorios
  numeroDocumento: string;
  tipoDocumentoId: number;
  nombres: string;
  apellidos: string;
  telefono: string;

  // Campos derivados o informativos
  tipoDocumentoNombre?: string;
  tipoDocumentoCodigo?: string;
  nombreCompleto?: string;

  // Campos opcionales
  fechaNacimiento?: string; // ISO string o LocalDate del backend
  edad?: number;
  genero?: string;
  contactoEmergenciaNombre?: string;
  contactoEmergenciaTelefono?: string;
  fotoUrl?: string;

  // Auditoría
  fechaCreacion?: string; // LocalDateTime -> string
  fechaActualizacion?: string;
  eliminado?: boolean;

  // Relaciones
  residentesIds?: number[];
  totalResidencias?: number;
}
