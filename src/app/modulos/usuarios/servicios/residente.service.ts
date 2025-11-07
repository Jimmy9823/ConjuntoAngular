import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Residente } from '../modelos/residente.model';

@Injectable({
  providedIn: 'root'
})
export class ResidenteService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/residentes';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // ==================== OPERACIONES CRUD BÁSICAS ====================

  listarResidentes(): Observable<any> {
    const headers = this.getHeaders();
    console.log('📡 GET /api/residentes - Listando residentes');
    return this.http.get<any>(this.baseUrl, { headers });
  }

  obtenerResidentePorId(id: number): Observable<Residente> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/${id} - Obteniendo residente por ID`);
    return this.http.get<Residente>(`${this.baseUrl}/${id}`, { headers });
  }

  crearResidente(residente: Residente): Observable<Residente> {
    const headers = this.getHeaders();
    console.log('📡 POST /api/residentes - Creando residente:', residente);
    return this.http.post<Residente>(this.baseUrl, residente, { headers });
  }

  actualizarResidente(id: number, residente: Residente): Observable<Residente> {
    const headers = this.getHeaders();
    console.log(`📡 PUT /api/residentes/${id} - Actualizando residente:`, residente);
    return this.http.put<Residente>(`${this.baseUrl}/${id}`, residente, { headers });
  }

  eliminarResidente(id: number): Observable<void> {
    const headers = this.getHeaders();
    console.log(`📡 DELETE /api/residentes/${id} - Eliminando residente`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }

  // ==================== BÚSQUEDAS POR APARTAMENTO Y TORRE ====================

  obtenerResidentesPorApartamento(apartamentoId: number): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/apartamento/${apartamentoId}`);
    return this.http.get<any>(`${this.baseUrl}/apartamento/${apartamentoId}`, { headers });
  }

  obtenerResidentesPorTorre(torreId: number): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/torre/${torreId}`);
    return this.http.get<any>(`${this.baseUrl}/torre/${torreId}`, { headers });
  }

  obtenerResidentesPorTorreNombre(nombreTorre: string): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/torre/nombre/${nombreTorre}`);
    return this.http.get<any>(`${this.baseUrl}/torre/nombre/${nombreTorre}`, { headers });
  }

  obtenerResidentesPorNumeroApartamento(numeroApartamento: string): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/apartamento/numero/${numeroApartamento}`);
    return this.http.get<any>(`${this.baseUrl}/apartamento/numero/${numeroApartamento}`, { headers });
  }

  // ==================== GESTIÓN DE RESPONSABLES ====================

  obtenerResponsablesPrincipales(): Observable<any> {
    const headers = this.getHeaders();
    console.log('📡 GET /api/residentes/responsables/principales');
    return this.http.get<any>(`${this.baseUrl}/responsables/principales`, { headers });
  }

  obtenerResponsablePrincipalPorApartamento(apartamentoId: number): Observable<Residente> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/responsable/principal/apartamento/${apartamentoId}`);
    return this.http.get<Residente>(`${this.baseUrl}/responsable/principal/apartamento/${apartamentoId}`, { headers });
  }

  cambiarResponsablePrincipal(apartamentoId: number, nuevoResponsableId: number): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 PUT /api/residentes/responsable/principal/apartamento/${apartamentoId}/nuevo/${nuevoResponsableId}`);
    return this.http.put<any>(`${this.baseUrl}/responsable/principal/apartamento/${apartamentoId}/nuevo/${nuevoResponsableId}`, {}, { headers });
  }

  // ==================== BÚSQUEDAS POR DATOS PERSONALES ====================

  buscarPorNombre(nombre: string): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/buscar/nombre/${nombre}`);
    return this.http.get<any>(`${this.baseUrl}/buscar/nombre/${nombre}`, { headers });
  }

  buscarPorApellido(apellido: string): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/buscar/apellido/${apellido}`);
    return this.http.get<any>(`${this.baseUrl}/buscar/apellido/${apellido}`, { headers });
  }

  buscarPorDocumento(documento: string): Observable<Residente> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/buscar/documento/${documento}`);
    return this.http.get<Residente>(`${this.baseUrl}/buscar/documento/${documento}`, { headers });
  }

  buscarPorTelefono(telefono: string): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/buscar/telefono/${telefono}`);
    return this.http.get<any>(`${this.baseUrl}/buscar/telefono/${telefono}`, { headers });
  }

  // ==================== CONTADORES Y ESTADÍSTICAS ====================

  contarResidentesActivos(): Observable<number> {
    const headers = this.getHeaders();
    console.log('📡 GET /api/residentes/contar/activos');
    return this.http.get<number>(`${this.baseUrl}/contar/activos`, { headers });
  }

  contarResidentesPorTorre(torreId: number): Observable<number> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/contar/torre/${torreId}`);
    return this.http.get<number>(`${this.baseUrl}/contar/torre/${torreId}`, { headers });
  }

  contarResponsablesPrincipales(): Observable<number> {
    const headers = this.getHeaders();
    console.log('📡 GET /api/residentes/contar/responsables/principales');
    return this.http.get<number>(`${this.baseUrl}/contar/responsables/principales`, { headers });
  }

  // ==================== REPORTES ====================

  obtenerReporteResidentesPorTorre(): Observable<any> {
    const headers = this.getHeaders();
    console.log('📡 GET /api/residentes/reportes/por-torre');
    return this.http.get<any>(`${this.baseUrl}/reportes/por-torre`, { headers });
  }

  obtenerReporteResidentesPorEstado(): Observable<any> {
    const headers = this.getHeaders();
    console.log('📡 GET /api/residentes/reportes/por-estado');
    return this.http.get<any>(`${this.baseUrl}/reportes/por-estado`, { headers });
  }

  // ==================== VALIDACIONES ====================

  validarPuedeEliminar(id: number): Observable<boolean> {
    const headers = this.getHeaders();
    console.log(`📡 GET /api/residentes/validar/puede-eliminar/${id}`);
    return this.http.get<boolean>(`${this.baseUrl}/validar/puede-eliminar/${id}`, { headers });
  }

  // ==================== GESTIÓN DE TRASLADOS ====================

  trasladarResidente(residenteId: number, nuevoApartamentoId: number): Observable<Residente> {
    const headers = this.getHeaders();
    console.log(`📡 PUT /api/residentes/trasladar/${residenteId}/apartamento/${nuevoApartamentoId}`);
    return this.http.put<Residente>(`${this.baseUrl}/trasladar/${residenteId}/apartamento/${nuevoApartamentoId}`, {}, { headers });
  }

  registrarSalidaResidente(residenteId: number, motivoSalida?: string): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams();
    if (motivoSalida) {
      params = params.set('motivoSalida', motivoSalida);
    }
    console.log(`📡 PUT /api/residentes/registrar-salida/${residenteId}`, { motivoSalida });
    return this.http.put<any>(`${this.baseUrl}/registrar-salida/${residenteId}`, {}, { headers, params });
  }

  reactivarResidente(residenteId: number): Observable<any> {
    const headers = this.getHeaders();
    console.log(`📡 PUT /api/residentes/reactivar/${residenteId}`);
    return this.http.put<any>(`${this.baseUrl}/reactivar/${residenteId}`, {}, { headers });
  }
}