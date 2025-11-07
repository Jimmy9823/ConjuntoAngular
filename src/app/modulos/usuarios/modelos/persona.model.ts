export interface Persona {
  id?: number;

  // Campos principales (iguales al DTO)
  numeroDocumento: string;
  tipoDocumentoId: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  
  // Campos opcionales
  fechaNacimiento?: string;
  genero?: string;
  contactoEmergenciaNombre?: string;
  contactoEmergenciaTelefono?: string;
  fotoUrl?: string;

  // Campos de respuesta (backend los completa)
  tipoDocumentoNombre?: string;
  tipoDocumentoCodigo?: string;
  nombreCompleto?: string;
  edad?: number;
  
  // Auditoría
  fechaCreacion?: string;
  fechaActualizacion?: string;
  eliminado?: boolean;

  // Relaciones
  residentesIds?: number[];
  totalResidencias?: number;
}