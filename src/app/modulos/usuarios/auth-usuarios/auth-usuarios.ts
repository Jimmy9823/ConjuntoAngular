import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Usuario } from '../modelos/usuario.model'
import { Persona } from '../modelos/persona.model'
import { UsuarioService } from '../servicios/usuario.service'
import { PersonaService } from '../servicios/persona.service'

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-usuarios.html',
  styleUrls: ['./auth-usuarios.css']
})
export class RegistroComponent {
  usuario: Usuario = {
    email: '',
    passwordHash: '',
    rolId: 1,
    activo: true
  }

  persona: Persona = {
    numeroDocumento: '',
    tipoDocumentoId: 1, // Por defecto CC
    nombres: '',
    apellidos: '',
    telefono: ''
  }

  mensaje = ''
  error = ''
  cargando = false

  constructor(
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private router: Router
  ) {}

  registrar() {
    this.mensaje = ''
    this.error = ''
    this.cargando = true

    if (!this.usuario.email || !this.usuario.passwordHash) {
      this.error = 'Por favor, completa los campos de usuario.'
      this.cargando = false
      return
    }

    // 1️⃣ Verificar si correo está disponible
    this.usuarioService.verificarCorreo(this.usuario.email).subscribe({
      next: disponible => {
        if (!disponible) {
          this.error = 'El correo ya está registrado.'
          this.cargando = false
          return
        }

        // 2️⃣ Registrar usuario
        this.usuarioService.registrarUsuario(this.usuario).subscribe({
          next: () => {
            // 3️⃣ Login automático
            this.usuarioService
              .login(this.usuario.email, this.usuario.passwordHash)
              .subscribe({
                next: loginResp => {
                  this.usuarioService.guardarSesion(
                    loginResp.token,
                    loginResp.email,
                    loginResp.rol,
                    loginResp.idUsuario
                  )

                  // 4️⃣ Registrar persona con token guardado
                  this.personaService.crearPersona(this.persona).subscribe({
                    next: () => {
                      this.mensaje = 'Registro completo ✅'
                      this.cargando = false
                      this.router.navigate(['/dashboard'])
                    },
                    error: err => {
                      console.error('Error creando persona', err)
                      this.error = 'Error al crear persona.'
                      this.cargando = false
                    }
                  })
                },
                error: err => {
                  console.error('Error login automático', err)
                  this.error = 'Error al iniciar sesión automáticamente.'
                  this.cargando = false
                }
              })
          },
          error: err => {
            console.error('Error registrando usuario', err)
            this.error = 'Error al registrar usuario.'
            this.cargando = false
          }
        })
      },
      error: () => {
        this.error = 'No se pudo verificar el correo.'
        this.cargando = false
      }
    })
  }
}
