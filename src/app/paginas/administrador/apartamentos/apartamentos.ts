import { Component } from '@angular/core';
import { CardMetricasComponent } from '../../../shared/card-metricas/card-metricas';
import { Headed } from '../../../shared/headed/headed';

@Component({
  selector: 'app-apartamentos',
  imports: [CardMetricasComponent, Headed],
  templateUrl: './apartamentos.html',
  styleUrl: './apartamentos.css'
})
export class Apartamentos {

  registrarApartamento() {
    // Lógica para registrar un nuevo apartamento
    console.log('Registrar nuevo apartamento');
  }

}
