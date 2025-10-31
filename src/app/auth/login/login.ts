import { Component, OnInit } from '@angular/core';
import { Boton } from '../../shared/boton/boton';
import { Form } from '../../shared/form/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Form, Boton, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  formGroup!: FormGroup;
  fields: any[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.fields = [
      { name: 'email', label: 'Correo Electrónico', type: 'email' },
      { name: 'password', label: 'Contraseña', type: 'text' }
    ];

    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.formGroup.invalid) {
      alert('Por favor completa todos los campos');
      return;
    }

    console.log('Datos del login:', this.formGroup.value);
    alert('Inicio de sesión exitoso 🎉');
    this.router.navigate(['/dashboard']);
  }
}