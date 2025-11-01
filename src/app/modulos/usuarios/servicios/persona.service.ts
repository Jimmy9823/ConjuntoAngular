import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Persona } from '../modelos/persona.model'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private http = inject(HttpClient)
  private base = 'http://localhost:8080/api/personas'

  crearPersona(persona: Persona): Observable<Persona> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.post<Persona>(this.base, persona, { headers })
  }
}
