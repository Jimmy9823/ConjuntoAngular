import { Component } from '@angular/core';
import { Imports_ } from '../../shared/imports';

interface Instalacion {
  imagen: string;
  icon: string;
  titulo: string;
  descripcion: string;
}
@Component({
  selector: 'app-instalaciones',
  imports: [Imports_],
  templateUrl: './instalaciones.html',
  styleUrl: './instalaciones.css'
})
export class Instalaciones {
  instalaciones: Instalacion[] = [
    {
      imagen: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: 'fas fa-swimmer',
      titulo: 'Piscina',
      descripcion: 'Área recreativa'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: 'fas fa-dumbbell',
      titulo: 'Gimnasio',
      descripcion: 'Equipos modernos'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: 'fas fa-glass-cheers',
      titulo: 'Salón Social',
      descripcion: 'Para eventos'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: 'fas fa-fire',
      titulo: 'Zona BBQ',
      descripcion: 'Parrillas equipadas'
    }
  ];
}
