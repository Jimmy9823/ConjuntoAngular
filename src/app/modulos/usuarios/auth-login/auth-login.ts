import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { Form } from '../../../shared/form/form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  imports: [Form],
  templateUrl: './auth-login.html',
  standalone: true,
  styleUrl: './auth-login.css'
})
export class AuthLogin implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  disableSubmit = true;

  fields = [
    { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'correo@ejemplo.com' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Ingrese su contraseña' }
  ];

  constructor(private usuarioService: UsuarioService , private router:Router) {}

  ngOnInit() {
    this.loginForm.statusChanges.subscribe(() => {
      this.disableSubmit = !this.loginForm.valid;
    });
  }

  onSubmit(values: any) {
    if (!this.loginForm.valid) return;

    console.log('📤 Intentando iniciar sesión con:', values);

    this.usuarioService.login(values.email, values.password).subscribe({
      next: (resp) => {
        console.log('✅ Inicio de sesión exitoso');
        console.log('🎫 Token recibido:', resp.token);
        console.log('📧 Email:', resp.email);
        console.log('👤 Rol:', resp.rol);
        console.log('🆔 ID Usuario:', resp.idUsuario);

        // Guardamos los datos en localStorage
        this.usuarioService.guardarSesion(resp.token, resp.email, resp.rol, resp.idUsuario);

        if (resp.rol === 'USUARIO') {
        this.router.navigate(['/residente']);
      } 
      else if (resp.rol === 'ADMIN') {
        this.router.navigate(['/administrador']);
      } 
      else if (resp.rol === 'SECURITY') {
        this.router.navigate(['/vigilante']);
      } 
      else {
        console.warn('⚠ Rol no reconocido:', resp.rol);
        this.router.navigate(['/login']); // fallback
      }
    },
      error: (err) => {
        console.error('❌ Error en inicio de sesión:', err);
        alert('Error al iniciar sesión. Verifique sus credenciales.');
      }
    });
  }
}


