import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Imports_ } from '../imports';

@Component({
  selector: 'app-boton',
  imports: [Imports_],
  templateUrl: './boton.html',
  styleUrl: './boton.css'
})
export class Boton {
  
  @Input() label: string = 'Botón';
  @Input() icono?: string;
  @Input() tipo: 'primario' | 'secundario' | 'transparente' |'venta' |'arriendo'|'organic' = 'primario';
  @Input() disabled: boolean = false;
  @Input() estilo: { [key: string]: string } = {};

  @Output() accion = new EventEmitter<void>();

  ejecutarAccion() {
    if (!this.disabled) this.accion.emit();
  }

  get clases(): string[] {
    return ['btn-organic', `btn-${this.tipo}`];
  }
  }

