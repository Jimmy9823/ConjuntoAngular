import { Component } from '@angular/core';
import { Header } from '../../core/header/header';
import { Hero } from '../../core/hero/hero';
import { NecesitasAyuda } from '../../core/necesitas-ayuda/necesitas-ayuda';
import { Instalaciones } from '../../core/instalaciones/instalaciones';
import { Avisos } from '../../core/avisos/avisos';
import { Eventos } from '../../core/eventos/eventos';
import { NuestroHogar } from '../../core/nuestro-hogar/nuestro-hogar';
import { PropiedadesDisponibles } from "../../core/propiedades-disponibles/propiedades-disponibles";
import { ServiciosDigitales } from "../../core/servicios-digitales/servicios-digitales";
import { Footer } from '../../core/footer/footer';

@Component({
  selector: 'app-inicio',
  imports: [Header, Hero, NecesitasAyuda, Instalaciones, Avisos, Eventos, NuestroHogar, PropiedadesDisponibles, ServiciosDigitales, Footer],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

}
