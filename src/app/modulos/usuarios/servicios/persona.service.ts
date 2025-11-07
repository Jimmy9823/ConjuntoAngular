import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../modelos/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/personas';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // CRUD Básico
  listarPersonas(): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(this.baseUrl, { headers });
  }

  obtenerPersonaPorId(id: number): Observable<Persona> {
    const headers = this.getHeaders();
    return this.http.get<Persona>(`${this.baseUrl}/${id}`, { headers });
  }

  crearPersona(persona: Persona): Observable<Persona> {
    const headers = this.getHeaders();
    return this.http.post<Persona>(this.baseUrl, persona, { headers });
  }

  actualizarPersona(id: number, persona: Persona): Observable<Persona> {
    const headers = this.getHeaders();
    return this.http.put<Persona>(`${this.baseUrl}/${id}`, persona, { headers });
  }

  eliminarPersona(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`, { headers });
  }

  // Búsquedas Especializadas
  obtenerPersonaPorDocumento(numeroDocumento: string): Observable<Persona> {
    const headers = this.getHeaders();
    return this.http.get<Persona>(`${this.baseUrl}/documento/${numeroDocumento}`, { headers });
  }

  obtenerPersonasPorTipoDocumento(tipoDocumentoId: number): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/tipo-documento/${tipoDocumentoId}`, { headers });
  }

  obtenerPersonasPorGenero(genero: string): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/genero/${genero}`, { headers });
  }

  buscarPersonas(termino: string): Observable<Persona[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('termino', termino);
    return this.http.get<Persona[]>(`${this.baseUrl}/buscar`, { headers, params });
  }

  buscarPersonasPorNombre(nombre: string): Observable<Persona[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Persona[]>(`${this.baseUrl}/nombre`, { headers, params });
  }

  // Búsquedas por Edad y Fecha
  obtenerPersonasPorRangoEdad(edadMin: number, edadMax: number): Observable<Persona[]> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('edadMin', edadMin.toString())
      .set('edadMax', edadMax.toString());
    return this.http.get<Persona[]>(`${this.baseUrl}/rango-edad`, { headers, params });
  }

  obtenerPersonasPorRangoFechaNacimiento(fechaInicio: string, fechaFin: string): Observable<Persona[]> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<Persona[]>(`${this.baseUrl}/rango-fecha-nacimiento`, { headers, params });
  }

  obtenerPersonasMayoresDeEdad(): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/mayores-edad`, { headers });
  }

  obtenerPersonasMenoresDeEdad(): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/menores-edad`, { headers });
  }

  // Gestión de Residencias
  obtenerPersonasSinResidencias(): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/sin-residencias`, { headers });
  }

  obtenerPersonasConResidencias(): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/con-residencias`, { headers });
  }

  contarResidenciasPorPersona(id: number): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.baseUrl}/${id}/residencias/contar`, { headers });
  }

  // Ordenamientos
  obtenerPersonasOrdenadasPorNombre(): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/ordenar/nombre`, { headers });
  }

  obtenerPersonasOrdenadasPorEdad(): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/ordenar/edad`, { headers });
  }

  obtenerPersonasOrdenadasPorFechaCreacion(): Observable<Persona[]> {
    const headers = this.getHeaders();
    return this.http.get<Persona[]>(`${this.baseUrl}/ordenar/fecha-creacion`, { headers });
  }

  // Estadísticas y Contadores
  contarTotalPersonas(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.baseUrl}/contar/total`, { headers });
  }

  contarPersonasPorTipoDocumento(tipoDocumentoId: number): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.baseUrl}/contar/tipo-documento/${tipoDocumentoId}`, { headers });
  }

  contarPersonasPorGenero(genero: string): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.baseUrl}/contar/genero/${genero}`, { headers });
  }

  // Validaciones
  existePersonaPorDocumento(numeroDocumento: string): Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.get<boolean>(`${this.baseUrl}/existe/documento/${numeroDocumento}`, { headers });
  }

  existePersonaPorTelefono(telefono: string): Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.get<boolean>(`${this.baseUrl}/existe/telefono/${telefono}`, { headers });
  }

  // Búsquedas por Contacto de Emergencia
  buscarPorContactoEmergencia(termino: string): Observable<Persona[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('termino', termino);
    return this.http.get<Persona[]>(`${this.baseUrl}/contacto-emergencia`, { headers, params });
  }
}