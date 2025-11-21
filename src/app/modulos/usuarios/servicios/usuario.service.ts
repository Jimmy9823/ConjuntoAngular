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

  registrarUsuario(payload: UsuarioRegisterDto): Observable<any> {
    return this.http.post<any>(`${this.base}/register`, payload);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, { email, password });
  }

  checkEmail(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.base}/check-email`, { params: { correo } });
  }

  recuperarPassword(correo: string) {
  return this.http.post(
    `${this.base}/recuperar`,
    null,
    {
      params: { correo },
      responseType: 'text' as 'text'
    }
  );
}



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




  resetPassword(token: string, password: string, confirmPassword: string) {

    console.log("DEBUG-ANGULAR: Enviando resetPassword()");
    console.log("token =", token);
    console.log("password =", password);
    console.log("confirmPassword =", confirmPassword);

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
        responseType: 'text'
      }
    );
  }

  validarToken(token: string) {
    return this.http.get(`${this.base}/validar-token`, {
      params: { token }
    });
  }
}
