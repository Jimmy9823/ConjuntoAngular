import { Component, ViewChild  } from '@angular/core';
import { CardMetricasComponent } from '../../../shared/card-metricas/card-metricas';
import { Headed } from '../../../shared/headed/headed';
import { Tabla } from '../../../shared/tabla/tabla';
import { RegistrarVehiculo } from '../../../modulos/vehiculos/registrar-vehiculo/registrar-vehiculo';

@Component({
  selector: 'app-vehiculos',
  imports: [CardMetricasComponent, Headed, RegistrarVehiculo],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css'
})
export class Vehiculos {
  @ViewChild(RegistrarVehiculo) modalVehiculo!: RegistrarVehiculo;

  abrirRegistrarVehiculo() {
    this.modalVehiculo.abrir();
  }

  onRegistrarVehiculo(data: any) {
    console.log('Vehículo registrado:', data);
  }

  

  

}
