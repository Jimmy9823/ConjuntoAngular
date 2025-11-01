export interface Usuario {
  id?: number
  email: string
  passwordHash: string
  rolId: number
  rolNombre?: string
  rolCodigo?: string
  personaId?: number
  personaNombre?: string
  personaDocumento?: string
  personaTelefono?: string
  personaFechaNacimiento?: string
  activo?: boolean
  intentosFallidos?: number
  ultimoAcceso?: string
  fechaCreacion?: string
  fechaActualizacion?: string
  eliminado?: boolean
  residentesIds?: number[]
  totalResidencias?: number
}
