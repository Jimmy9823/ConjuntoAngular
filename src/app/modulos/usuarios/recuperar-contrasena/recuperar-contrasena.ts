import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { Form } from '../../../shared/form/form';
import { Imports_ } from '../../../shared/imports';
import { Boton } from '../../../shared/boton/boton';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [Form, Imports_, Boton],
  templateUrl: './recuperar-contrasena.html',
  styleUrls: ['./recuperar-contrasena.css']
})
export class RecuperarContrasena {

  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  mensajeError = '';
  mensajeExito = '';
  disableSubmit = false;
  correoNoRegistrado = false; // <-- nuevo

  fields = [
    {
      name: 'correo',
      label: 'Correo electrónico registrado',
      type: 'email',
      placeholder: 'correo@ejemplo.com'
    }
  ];

  formGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  onSubmit(values: any) {
    this.mensajeError = '';
    this.mensajeExito = '';
    this.correoNoRegistrado = false;
    this.disableSubmit = true;

    const correo = values.correo;

    // 1️⃣ PRIMERO: verificar si el correo existe en la base de datos
    this.usuarioService.checkEmail(correo).subscribe({

      next: (respuesta: any) => {
        // Si respuesta == true → correo NO existe
        if (respuesta === true) {
          this.correoNoRegistrado = true;
          this.disableSubmit = false;
          return;
        }

        // 2️⃣ SI EXISTE → proceder a recuperar contraseña
        this.usuarioService.recuperarPassword(correo).subscribe({

          next: () => {
            this.mensajeExito = 'Hemos enviado el link de recuperación a tu correo.';
            setTimeout(() => this.router.navigate(['/login2']), 1000);
          },

          error: err => {
            this.mensajeError = err.error?.mensaje || 'No se pudo procesar la solicitud.';
            this.disableSubmit = false;
          }

        });
      },

      error: () => {
        this.mensajeError = 'Error al verificar el correo.';
        this.disableSubmit = false;
      }
    });
  }

  irARegistro() {
  this.router.navigate(['/registro']);
}

}
