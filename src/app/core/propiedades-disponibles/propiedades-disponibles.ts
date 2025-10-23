import { Component } from '@angular/core';
import { Boton } from '../../shared/boton/boton';
import { Card } from '../../shared/card/card';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Imports_ } from '../../shared/imports';


@Component({
  selector: 'app-propiedades-disponibles',
  imports: [Boton,Card,Imports_],
  templateUrl: './propiedades-disponibles.html',
  styleUrl: './propiedades-disponibles.css'
})
export class PropiedadesDisponibles {
propiedades = [
    {
      imagen:
        'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noy55ZRVBaJ4Ee_79oSjfTSGvK-ZMwSOutCraEf8Ul-FGmFgNygjeJ8KdU6-et-RzethxLf6gnvrrowPIbMZ3NvX_B1o_dajmjIESej5tvOEY21b1ufEqD0IFNYGOTh8DtRjANK=s1360-w1360-h1020-rw',
      titulo: 'Apt 801 - Torre C',
      descripcion: '1 hab • 1 baño • Vista panorámica',
      precio: '$950K',
      estado: 'VENTA',
      estrellas: 5,
      contacto: 'María López - 315 456 7890'
    },
    {
      imagen:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      titulo: 'Apt 203 - Torre A',
      descripcion: '2 hab • 2 baños • Balcón amplio',
      precio: '$1.200K',
      estado: 'ARRIENDO',
      estrellas: 3,
      contacto: 'Carlos Gómez - 310 654 3210'
    }
  ];

  verTodasLasPropiedades() {
    console.log('Navegando a la página de todas las propiedades...');
  }
  
}
