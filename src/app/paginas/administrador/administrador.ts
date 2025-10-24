import { Component } from '@angular/core';
import {  CardMetricasComponent } from "../../shared/card-metricas/card-metricas";
import { Boton } from '../../shared/boton/boton';

@Component({
  selector: 'app-administrador',
  imports: [CardMetricasComponent, CardMetricasComponent,Boton],
  templateUrl: './administrador.html',
  styleUrl: './administrador.css'
})
export class Administrador {
  accederAResidentes() {
    window.location.href = '/Admin/residentes';
  }

}
