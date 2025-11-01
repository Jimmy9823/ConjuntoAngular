import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  email?: string;
  nombre?: string;
  rol?: string;
  idUsuario?: number;
}

export interface UsuarioRegisterDto {
  email: string;
  passwordHash: string; // backend espera passwordHash en tu DTO; se envía desde frontend
  rolId?: number;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  // base para tu controlador UsuarioAuthRestController
  private base = 'http://localhost:8080/api/auth';

  // Registro
  registrarUsuario(payload: UsuarioRegisterDto): Observable<any> {
    return this.http.post<any>(`${this.base}/register`, payload);
  }

  // Login
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, { email, password });
  }

  verificarCorreo(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.base}/check-email`, {
      params: { correo }
    })
  }

  // Recuperación
  solicitarRecuperacion(correo: string): Observable<any> {
    // controller: POST /api/auth/recuperar?correo=...
    return this.http.post<any>(`${this.base}/recuperar?correo=${encodeURIComponent(correo)}`, {});
  }

  // Reset password
  resetPassword(token: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(
      `${this.base}/reset-password?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}&confirmPassword=${encodeURIComponent(confirmPassword)}`,
      {}
    );
  }

  // Check email disponible
  checkEmail(correo: string) {
    return this.http.get<boolean>(`${this.base}/check-email?correo=${encodeURIComponent(correo)}`);
  }

  // Sesión local
  guardarSesion(token: string, email?: string, rol?: string, idUsuario?: number) {
    localStorage.setItem('token', token);
    if (email) localStorage.setItem('email', email);
    if (rol) localStorage.setItem('rol', rol);
    if (idUsuario !== undefined && idUsuario !== null) localStorage.setItem('idUsuario', String(idUsuario));
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');
  }
}
