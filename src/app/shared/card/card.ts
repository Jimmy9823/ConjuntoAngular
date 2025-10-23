import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Imports_ } from '../imports';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome' 

@Component({
  selector: 'app-card',
  imports: [Imports_, FontAwesomeModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card { 
@Input() imagen!: string;
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() precio!: string;
  @Input() estado!: string; // "VENTA" o "ARRIENDO"
  @Input() estrellas: number = 0;
  @Input() contacto!: string;
  @Input() botonTexto: string = 'Ver Detalles';

  get badgeClass() {
    return this.estado === 'VENTA'
      ? 'bg-success text-white'
      : 'bg-primary text-white';
  }

  get borderColor() {
    return this.estado === 'VENTA'
      ? '2px solid #a7f3d0'
      : '2px solid #bfdbfe';
  }

  get gradientFondo() {
    return this.estado === 'VENTA'
      ? 'linear-gradient(135deg, #f0fdf4, #ecfdf5)'
      : 'linear-gradient(135deg, #eff6ff, #dbeafe)';
  }

  get botonClass() {
    return this.estado === 'VENTA' ? 'btn-venta' : 'btn-arriendo';
  }

  verDetalles() {
    console.log(`Detalles de ${this.titulo}`);
  }
}
