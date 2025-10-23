import { Component } from '@angular/core';
import { Boton } from '../../shared/boton/boton';

@Component({
  selector: 'app-eventos',
  imports: [Boton],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class Eventos {
eventos = [
    {
      titulo: 'Campaña de Vacunación Mascotas',
      descripcion: 'Jornada gratuita con veterinarios especializados',
      fecha: '30 Sept 2025 - 9:00 AM',
      icono: 'fa-paw',
      color: 'success',
    },
    {
      titulo: 'Asamblea General Ordinaria',
      descripcion: 'Citación a todos los propietarios del conjunto',
      fecha: '15 Oct 2025 - 6:00 PM',
      icono: 'fa-users',
      color: 'primary',
    },
  ];
  verEventos() {
    // Lógica para ver todos los eventos
    console.log('Ver todos los eventos');
  }

  masInfo() {
    // Lógica para más información del evento
    console.log('Más información del evento');
  }
}

