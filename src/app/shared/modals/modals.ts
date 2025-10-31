import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-modals',
  imports: [],
  templateUrl: './modals.html',
  styleUrl: './modals.css'
})
export class Modals {
 @Input() titulo: string = '';
  @Input() visible: boolean = false;  // para mostrar/ocultar
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}
