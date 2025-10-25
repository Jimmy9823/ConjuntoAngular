import { Component } from '@angular/core';
import { Boton } from '../../shared/boton/boton';

@Component({
  selector: 'app-menu',
  imports: [Boton],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  accederAResidentes() {
    console.log('Navegando a la sección de residentes...');
  }

  accederAApartamentos() {
    console.log('Navegando a la sección de apartamentos...');
  }

  accederATorres() {
    console.log('Navegando a la sección de torres...');
  }

  accederAVehiculos() {
    console.log('Navegando a la sección de vehículos...');
  }

  accederAParqueaderos() {
    console.log('Navegando a la sección de parqueaderos...');
  }
  accederAReportes() {
    console.log('Navegando a la sección de reportes...');
  }

}
