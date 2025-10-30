import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Boton } from '../boton/boton';

@Component({
  selector: 'app-headed',
  imports: [Boton],
  templateUrl: './headed.html',
  styleUrl: './headed.css'
})
export class Headed {
  @Input() icon!: string;
  @Input() titulo!: string;
  @Input() descripcion!: string;

  // Opcionales del botón
  @Input() mostrarBoton: boolean = false;
  @Input() nombreBoton?: string;
@Input() tipoBoton: 'primario' | 'secundario' | 'transparente' | 'venta' | 'arriendo' | 'organic' = 'secundario';

  @Output() accionBoton = new EventEmitter<void>();

}
