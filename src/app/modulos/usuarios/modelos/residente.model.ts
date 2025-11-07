export interface Residente {
  id?: number;

  // 🔗 Relación con Persona (OBLIGATORIO)
  personaId: number;
  personaNombre?: string;
  personaDocumento?: string;

  // 🏢 Relación con Apartamento (OBLIGATORIO)
  apartamentoId: number;
  apartamentoNumero?: string;
  torreNombre?: string;

  // 👤 Relación con Usuario (OPCIONAL - puede ser null)
  usuarioId?: number | null;
  usuarioNombre?: string;

  // 🏷️ Tipo de residente (OBLIGATORIO)
  tipoResidenteId: number;
  tipoResidenteNombre?: string;

  // 📊 Estado actual del residente (OBLIGATORIO)
  estadoId: number;
  estadoNombre?: string;

  // 👑 Responsable principal (default: false)
  esResponsablePrincipal?: boolean;

  // 📅 Fechas (OBLIGATORIO)
  fechaInicio: string;   // ISO string (YYYY-MM-DD)
  fechaFin?: string | null;

  // 📝 Observaciones (OPCIONAL)
  observaciones?: string | null;

  // ⏰ Campos automáticos del backend
  fechaCreacion?: string;
  fechaActualizacion?: string;
  eliminado?: boolean;

  // 🔗 Relación con otras entidades
  vehiculosIds?: number[];
  reservasIds?: number[];

  // 📈 Contadores
  totalVehiculos?: number;
  totalReservas?: number;
}

// 📋 Interfaces auxiliares para el formulario
export interface ResidenteFormData {
  // Relaciones básicas
  personaId: number;
  apartamentoId: number;
  tipoResidenteId: number;
  estadoId: number;
  
  // Datos específicos del residente
  esResponsablePrincipal: boolean;
  fechaInicio: string;
  fechaFin?: string;
  observaciones?: string;
  
  // Relación opcional con usuario
  usuarioId?: number | null;
}

// 🎯 Opciones para selects del formulario
export interface OpcionesResidente {
  tiposResidente: { value: number; text: string }[];
  estadosResidente: { value: number; text: string }[];
  apartamentos: { value: number; text: string; torre: string }[];
  personas: { value: number; text: string; documento: string }[];
}