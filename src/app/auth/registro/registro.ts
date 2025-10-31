import { Component, OnInit, Output } from '@angular/core';
import { Boton } from '../../shared/boton/boton';
import { Form } from '../../shared/form/form';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [Form, Boton],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro implements OnInit {
  formGroup!: FormGroup;
  fields: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
    });

    this.fields = [
      { label: 'Nombre completo', name: 'nombre', type: 'text' },
      { label: 'Correo electrónico', name: 'correo', type: 'email' },
      { label: 'Contraseña', name: 'contraseña', type: 'text' },
    ];
  }

  registrar() {
    if (this.formGroup.valid) {
      console.log('Datos del formulario:', this.formGroup.value);
    }
  }
}