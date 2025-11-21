import { Component, OnInit } from '@angular/core';
import { Form } from '../../shared/form/form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService, UsuarioRegisterDto } from '../../modulos/usuarios/servicios/usuario.service';
import { Router } from '@angular/router';
import { Boton } from '../../shared/boton/boton';
import { Imports_ } from '../../shared/imports';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [Form, Boton, Imports_, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
  standalone: true
})
export class Registro implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  disableSubmit = true;

  // ⚠ Mensaje visual (error o info)
  uiMessage: string | null = null;
  uiMessageType: 'error' | 'info' | null = null;

  fields = [
    { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'correo@ejemplo.com' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Mínimo 6 caracteres' }
  ];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm.statusChanges.subscribe(() => {
      this.disableSubmit = !this.registerForm.valid;
    });
  }

  private mostrarMensaje(tipo: 'error' | 'info', texto: string) {
    this.uiMessageType = tipo;
    this.uiMessage = texto;

    // mensaje se borra después de 5s
    setTimeout(() => {
      this.uiMessage = null;
      this.uiMessageType = null;
    }, 5000);
  }

  onSubmit(values: any) {
    if (!this.registerForm.valid) return;

    const correo = values.email;

    console.log("🔍 Verificando si el correo está disponible:", correo);

    // PRIMER PASO → checkEmail
    this.usuarioService.checkEmail(correo).subscribe({
      next: (disponible) => {

        if (!disponible) {
          // correo YA existe → mensaje bonito + redirección
          console.log("⚠️ El correo ya está registrado");
          this.mostrarMensaje(
            'error',
            'Este correo ya está registrado. Inicia sesión o recupera tu contraseña.'
          );

          
          return;
        }

        // SI ESTÁ DISPONIBLE → Registrar usuario
        const payload: UsuarioRegisterDto = {
          email: values.email,
          passwordHash: values.password,
          rolId: 1
        };

        console.log("📦 Registrando usuario:", payload);

        this.usuarioService.registrarUsuario(payload).subscribe({
          next: (res) => {
            console.log("✅ Registro exitoso:", res);

            // LOGIN AUTOMÁTICO
            this.usuarioService.login(values.email, values.password).subscribe({
              next: (resp) => {
                console.log("🔐 Login automático exitoso:", resp);

                this.usuarioService.guardarSesion(
                  resp.token,
                  resp.email,
                  resp.rol,
                  resp.idUsuario
                );

                // Redirigir a registro-persona
                this.router.navigate(['/registrar-persona']);
              },
              error: (e) => {
                console.error("❌ Error login automático", e);
                this.mostrarMensaje(
                  'error',
                  'Tu usuario fue creado, pero ocurrió un error iniciando sesión automáticamente.'
                );
              }
            });
          },
          error: (err) => {
            console.error("❌ Error en registro", err);
            this.mostrarMensaje('error', 'Hubo un error al registrarte.');
          }
        });
      },
      error: (err) => {
        console.error("❌ Error en checkEmail", err);
        this.mostrarMensaje('error', 'No fue posible verificar el correo.');
      }
    });
  }
}
