import { Component } from '@angular/core';
import { Imports_ } from '../../shared/imports';

interface InfoContacto {
  icon: string;
  title: string;
  lines: string[];
}

@Component({
  selector: 'app-necesitas-ayuda',
  imports: [Imports_],
  templateUrl: './necesitas-ayuda.html',
  styleUrl: './necesitas-ayuda.css'
})
export class NecesitasAyuda {
  imagenOficina = 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noy55ZRVBaJ4Ee_79oSjfTSGvK-ZMwSOutCraEf8Ul-FGmFgNygjeJ8KdU6-et-RzethxLf6gnvrrowPIbMZ3NvX_B1o_dajmjIESej5tvOEY21b1ufEqD0IFNYGOTh8DtRjANK=s1360-w1360-h1020-rw';
  
  infoContacto: InfoContacto[] = [
    {
      icon: 'fas fa-clock',
      title: 'Horario de Atención',
      lines: ['Lun - Vie: 8:00 AM - 5:00 PM', 'Sáb: 8:00 AM - 12:00 PM']
    },
    {
      icon: 'fas fa-phone',
      title: 'Teléfono',
      lines: ['311 4579051']
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      lines: ['admin@AlamedaPorvenirEtapa1.com', 'porteria@AlamedaPorvenirEtapa1.com']
    }
  ];

  onAgendarCita() {
    console.log('Agendar cita con administración');
  }
}
