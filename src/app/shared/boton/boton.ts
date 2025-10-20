import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Imports_ } from '../imports';

@Component({
  selector: 'app-boton',
  imports: [Imports_],
  templateUrl: './boton.html',
  styleUrl: './boton.css'
})
export class Boton {
  @Input() label: string = '';
  @Input() tipo: string = ''; 
  @Input() disabled: boolean = false;
  @Input() estilo: { [key: string]: string } = {};

  // 👉 Clases de Font Awesome, ejemplo: 'fa-solid fa-right-to-bracket'
  @Input() icono: string = '';  

  @Output() accion = new EventEmitter<void>();

  ejecutarAccion() {
    this.accion.emit();
  }
}
