import { Component } from '@angular/core';
import { CardMetricasComponent } from '../../../shared/card-metricas/card-metricas';
import { Headed } from '../../../shared/headed/headed';

@Component({
  selector: 'app-residentes',
  imports: [CardMetricasComponent,Headed],
  templateUrl: './residentes.html',
  styleUrl: './residentes.css'
})
export class Residentes {

  registrarResidente() {
    console.log("Registrar residente");
  }

}
