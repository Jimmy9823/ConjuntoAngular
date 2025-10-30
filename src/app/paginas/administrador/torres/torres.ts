import { Component } from '@angular/core';
import { Headed } from '../../../shared/headed/headed';

@Component({
  selector: 'app-torres',
  imports: [ Headed],
  templateUrl: './torres.html',
  styleUrl: './torres.css'
})
export class Torres {

  registrarTorre() {
    // Lógica para registrar una nueva torre
    console.log('Registrar nueva torre');
  }

}
