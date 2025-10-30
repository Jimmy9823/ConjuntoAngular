import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Boton } from '../../shared/boton/boton';

@Component({
  selector: 'app-menu',
  imports: [Boton],
  templateUrl: './menu.html',
})
export class Menu {
  constructor(private router: Router) {}

  accederAResidentes() {
    console.log('Navegando a la sección de residentes...');
    this.router.navigate(['residentes']);
  }

  accederAApartamentos() {
    console.log('Navegando a la sección de apartamentos...');
    this.router.navigate(['apartamentos']);
  }

  accederATorres() {
    console.log('Navegando a la sección de torres...');
    this.router.navigate(['torres']);
  }

  accederAVehiculos() {
    console.log('Navegando a la sección de vehículos...');
    this.router.navigate(['vehiculos']);
  }

  accederAParqueaderos() {
    console.log('Navegando a la sección de parqueaderos...');
    this.router.navigate(['parqueaderos']);
  }
  accederAReportes() {
    console.log('Navegando a la sección de reportes...');
  }

}
