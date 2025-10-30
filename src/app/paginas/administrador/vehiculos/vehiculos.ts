import { Component, ViewChild  } from '@angular/core';
import { CardMetricasComponent } from '../../../shared/card-metricas/card-metricas';
import { Headed } from '../../../shared/headed/headed';
import { Tabla } from '../../../shared/tabla/tabla';

@Component({
  selector: 'app-vehiculos',
  imports: [CardMetricasComponent,Headed,Tabla],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css'
})
export class Vehiculos {
  registrarVehiculo() {
    // Lógica para registrar un vehículo
  }

  

  

}
