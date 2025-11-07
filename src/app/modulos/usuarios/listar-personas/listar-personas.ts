import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../servicios/persona.service';
import { Persona } from '../modelos/persona.model';
import { Tabla } from '../../../shared/tabla/tabla';

@Component({
  selector: 'app-lista-personas',
  standalone: true,
  imports: [CommonModule, Tabla],
  templateUrl: './listar-personas.html',
  styleUrls: ['./listar-personas.css']
})
export class ListaPersonas implements OnInit {
  private personaService = inject(PersonaService);

  personas: Persona[] = [];
  cargando = false;
  mensaje = '';
  esError = false;
  token: string | null = null;

  columnas = [
    { key: 'id', label: 'ID' },
    { key: 'nombreCompleto', label: 'Nombre Completo' },
    { key: 'numeroDocumento', label: 'Documento' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'edad', label: 'Edad' },
    { key: 'genero', label: 'Género' },
    { key: 'totalResidencias', label: 'Residencias' },
    { key: 'fechaCreacion', label: 'Fecha Registro' }
  ];

  ngOnInit() {
    this.token = localStorage.getItem('token');
    
    if (!this.token) {
      this.mensaje = 'No hay token de autenticación. Por favor inicia sesión primero.';
      this.esError = true;
    }
  }

  cargarPersonas() {
    this.token = localStorage.getItem('token');
    
    if (!this.token) {
      this.mensaje = 'Error: No se encontró token de autenticación';
      this.esError = true;
      return;
    }

    this.cargando = true;
    this.mensaje = 'Cargando personas...';
    this.esError = false;

    console.log('🔐 Token encontrado, realizando solicitud...');

    this.personaService.listarPersonas().subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se cargaron ${personas.length} personas correctamente`;
        this.esError = false;
        console.log('✅ Personas cargadas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al cargar personas: ${error.message || 'Error desconocido'}`;
        this.esError = true;
        console.error('❌ Error:', error);
      }
    });
  }
}