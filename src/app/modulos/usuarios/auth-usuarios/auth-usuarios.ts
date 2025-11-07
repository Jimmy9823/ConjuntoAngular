import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService, UsuarioRegisterDto } from '../servicios/usuario.service';
import { Form } from '../../../shared/form/form';

@Component({
  selector: 'app-auth-usuarios',
  templateUrl: './auth-usuarios.html',
  styleUrls: ['./auth-usuarios.css'],
  imports: [Form],
  standalone: true
})
export class AuthUsuariosRegitro implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  disableSubmit = true;

  fields = [
    { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'correo@ejemplo.com' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Mínimo 6 caracteres' }
  ];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.registerForm.statusChanges.subscribe(() => {
      this.disableSubmit = !this.registerForm.valid;
    });
  }

  onSubmit(values: any) {
    if (!this.registerForm.valid) return;

    const payload: UsuarioRegisterDto = {
      email: values.email,
      passwordHash: values.password, // backend espera passwordHash en register
      rolId: 1
    };

    // Log del payload (ya lo tenías)
    console.log('📦 Enviando al backend (register):', payload);

    this.usuarioService.registrarUsuario(payload).subscribe({
      next: (res) => {
        // res es el JSON que ahora devuelve el backend (status/mensaje/email)
        console.log('✅ Registro exitoso:', res);

        // --- Login automático ---
        // IMPORTANTE: login debe enviar { email, password } (no passwordHash)
        this.usuarioService.login(values.email, values.password).subscribe({
          next: (resp) => {
            console.log('✅ Inicio de sesión exitoso (login automático).');
            console.log('🎫 Token recibido:', resp.token);
            console.log('📧 Email en respuesta:', resp.email);
            console.log('👤 Rol en respuesta:', resp.rol, ' idUsuario:', resp.idUsuario);

            // Guardar sesión usando las keys corregidas
            this.usuarioService.guardarSesion(resp.token, resp.email, resp.rol, resp.idUsuario);
          },
          error: (err) => {
            console.error('❌ Error en login automático:', err);
            // Si recibes 401 aquí, revisar:
            //  - Que el password haya sido correctamente guardado y/o hasheado
            //  - Que usuarioService.crearUsuario() almacene correctamente la contraseña (hash)
            //  - Que no haya retraso entre el commit DB y el intento de login (en raros casos, agregar pequeño setTimeout)
          }
        });
      },
      error: (err) => console.error('❌ Error en registro:', err)
    });
  }
}
