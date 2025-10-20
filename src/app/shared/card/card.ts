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
  @Input() titulo: string = ''
  @Input() subtitulo: string = ''
  @Input() descripcion: string = ''
  @Input() imagen: string = ''
  @Input() precio: string = ''
  @Input() extraInfo: string = ''

  // --- Íconos opcionales (ej. rating o usuario) ---
  @Input() iconos: IconDefinition[] = []
  @Input() rating: number | null = null // ejemplo: 4 -> 4 estrellas llenas

  // --- Botón configurable ---
  @Input() mostrarBoton: boolean = true
  @Input() textoBoton: string = 'Ver Detalles'
  @Output() clickBoton = new EventEmitter<void>()

  emitirAccion(): void {
    this.clickBoton.emit()
  }
}
