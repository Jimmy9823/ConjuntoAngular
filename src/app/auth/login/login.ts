import { Component, OnInit } from '@angular/core';
import { Form } from '../../shared/form/form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../modulos/usuarios/servicios/usuario.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [Form, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  disableSubmit = true;

  fields = [
    { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'correo@ejemplo.com' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Ingrese su contraseña' }
  ];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
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
        console.log('🎫 Token:', resp.token);
        console.log('📧 Email:', resp.email);
        console.log('👤 Rol:', resp.rol);
        console.log('🆔 ID Usuario:', resp.idUsuario);

        // Guardar sesión
        this.usuarioService.guardarSesion(resp.token, resp.email, resp.rol, resp.idUsuario);

        // Redirección por roles
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
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      }
    });
  }
}
