import { Component } from '@angular/core';
import { CardMetricasComponent } from '../../../shared/card-metricas/card-metricas';
import { Headed } from '../../../shared/headed/headed';

@Component({
  selector: 'app-parqueaderos',
  imports: [CardMetricasComponent,Headed],
  templateUrl: './parqueaderos.html',
  styleUrl: './parqueaderos.css'
})
export class Parqueaderos {

  registrarParqueadero(){
    console.log("Registrar parqueadero");
  }

}
