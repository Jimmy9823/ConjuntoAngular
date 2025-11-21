import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { Form } from '../../../shared/form/form';
import { Imports_ } from '../../../shared/imports';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [Form, Imports_],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  token: string = '';
  disableSubmit = false;
  mensajeError = '';
  mensajeExito = '';

  fields = [
    {
      name: 'password',
      label: 'Nueva Contraseña',
      type: 'password',
      placeholder: 'Escribe la nueva contraseña'
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Contraseña',
      type: 'password',
      placeholder: 'Confirma la contraseña'
    }
  ];

  formGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];

      if (!this.token) {
        this.mensajeError = 'El enlace no contiene un token válido.';
      }
    });
  }

  async onSubmit(values: any) {
    this.mensajeError = '';
    this.mensajeExito = '';

    console.log("DEBUG-ANGULAR: onSubmit()", values);

    if (values.password !== values.confirmPassword) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    this.disableSubmit = true;

    this.usuarioService.resetPassword(
      this.token,
      values.password,
      values.confirmPassword
    ).subscribe({
      next: (resp: string) => {
        this.mensajeExito = resp;
        setTimeout(() => this.router.navigate(['/login2']), 2000);
      },
      error: err => {
        console.log("DEBUG-ANGULAR ERROR:", err);
        this.mensajeError = err.error || 'No se pudo restablecer la contraseña';
        this.disableSubmit = false;
      }
    });
  }

}
