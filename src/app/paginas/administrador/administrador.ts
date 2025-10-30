import { Component } from '@angular/core';
import { Menu } from '../../core/menu/menu';
import { Headed } from '../../shared/headed/headed';
import { CardMetricasMain } from "../../shared/card-metricas-main/card-metricas-main";

@Component({
  selector: 'app-administrador',
  imports: [ Menu, Headed, CardMetricasMain],
  templateUrl: './administrador.html',
  styleUrl: './administrador.css'
})
export class Administrador {
  accederAResidentes() {
    window.location.href = '/Admin/residentes';
  }

}
