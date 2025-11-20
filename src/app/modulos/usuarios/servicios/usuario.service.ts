import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  email?: string;    // backend devuelve "email"
  nombre?: string;
  rol?: string;
  idUsuario?: number;
}

export interface UsuarioRegisterDto {
  email: string;
  passwordHash: string;
  rolId?: number;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/api/auth';

  // Registrar usuario
  registrarUsuario(payload: UsuarioRegisterDto): Observable<any> {
    // Por defecto Angular espera JSON, así que no hace falta responseType
    return this.http.post<any>(`${this.base}/register`, payload);
  }

  // Login: enviar { email, password } (EXACTO lo que espera el backend)
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, { email, password });
  }

  // Verificar si el correo ya está registrado
  checkEmail(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.base}/check-email`, {
      params: { correo }
    });
  }

  // Guardar token y datos del usuario en localStorage
  guardarSesion(token: string, email?: string, rol?: string, idUsuario?: number) {
    localStorage.setItem('token', token);
    if (email) localStorage.setItem('email', email);
    if (rol) localStorage.setItem('rol', rol);
    if (idUsuario !== undefined) localStorage.setItem('idUsuario', idUsuario.toString());
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

  // Solicita un correo para enviar enlace de recuperación
  recuperarPassword(correo: string) {
    return this.http.post(`${this.base}/recuperar`, { correo });
  }

  // Reset password (token y nueva contraseña)
 resetPassword(token: string, password: string, confirmPassword: string) {

  const body = new URLSearchParams();
  body.set('token', token);
  body.set('password', password);
  body.set('confirmPassword', confirmPassword);

  return this.http.post(
    `${this.base}/reset-password`,
    body.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/plain'
      },
      responseType: 'text'  // <-- ESTA LÍNEA ES CLAVE
    }
  );
}


  // Validar token desde el correo (opcional)
  validarToken(token: string) {
    return this.http.get(`${this.base}/validar-token`, {
      params: { token }
    });
  }

}
