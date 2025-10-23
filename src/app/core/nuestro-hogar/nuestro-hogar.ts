import { Component } from '@angular/core';
import { Boton } from '../../shared/boton/boton';

@Component({
  selector: 'app-nuestro-hogar',
  imports: [Boton],
  templateUrl: './nuestro-hogar.html',
  styleUrl: './nuestro-hogar.css'
})
export class NuestroHogar {
  verGaleria() {
    // Lógica para ver la galería
  }

}
