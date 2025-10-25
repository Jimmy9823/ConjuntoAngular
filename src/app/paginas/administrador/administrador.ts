import { Component } from '@angular/core';
import {  CardMetricasComponent } from "../../shared/card-metricas/card-metricas";
import { Boton } from '../../shared/boton/boton';
import { Menu } from '../../core/menu/menu';

@Component({
  selector: 'app-administrador',
  imports: [CardMetricasComponent, CardMetricasComponent,Menu],
  templateUrl: './administrador.html',
  styleUrl: './administrador.css'
})
export class Administrador {
  accederAResidentes() {
    window.location.href = '/Admin/residentes';
  }

}
