import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from '../servicios/persona.service';
import { Persona } from '../modelos/persona.model';
import { Form } from '../../../shared/form/form';
import { Boton } from '../../../shared/boton/boton';

@Component({
  selector: 'app-crear-persona',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Form,Boton],
  templateUrl: './registrar-persona.html',
  styleUrls: ['./registrar-persona.css']
})
export class CrearPersona implements OnInit {
  private personaService = inject(PersonaService);
  private router = inject(Router);

  // FormGroup para crear persona
  personaForm = new FormGroup({
    numeroDocumento: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    tipoDocumentoId: new FormControl('', Validators.required),
    nombres: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    fechaNacimiento: new FormControl('', Validators.required), // Ahora es requerido
    genero: new FormControl(''),
    contactoEmergenciaNombre: new FormControl('', Validators.maxLength(200)),
    contactoEmergenciaTelefono: new FormControl('', Validators.maxLength(15)),
    fotoUrl: new FormControl('')
  });

  cargando = false;
  mensaje = '';
  esError = false;
  token: string | null = null;

  // Opciones para los selects
  opcionesTipoDocumento = [
    { value: 1, text: 'Cédula de Ciudadanía' },
    { value: 2, text: 'Cédula de Extranjería' },
    { value: 3, text: 'Pasaporte' },
    { value: 4, text: 'Tarjeta de Identidad' }
  ];

  opcionesGenero = [
    { value: 'M', text: 'Masculino' },
    { value: 'F', text: 'Femenino' },
    { value: 'O', text: 'Otro' }
  ];

  // Fields para el formulario reutilizable
  fields = [
    {
      name: 'nombres',
      label: 'Nombres *',
      type: 'text',
      placeholder: 'Ej: Juan Carlos',
      required: true,
      cols: 6 
    },
     {
      name: 'apellidos',
      label: 'Apellidos *',
      type: 'text',
      placeholder: 'Ej: Pérez García',
      required: true,
      cols: 6 
    },
    {
      name: 'numeroDocumento',
      label: 'Número de Documento *',
      type: 'text',
      placeholder: 'Ej: 123456789',
      required: true,
          cols: 6 

    },
    {
      name: 'tipoDocumentoId',
      label: 'Tipo de Documento *',
      type: 'select',
      options: this.opcionesTipoDocumento,
      required: true,
          cols: 6 

    },
    
   
    
    {
      name: 'fechaNacimiento',
      label: 'Fecha de Nacimiento *',
      type: 'date', // Cambiado a 'date' para usar input nativo de fecha
      required: true,
      cols: 6 
    },
    {
      name: 'genero',
      label: 'Género',
      type: 'select',
      options: this.opcionesGenero,
      cols: 6 
    },
    {
      name: 'telefono',
      label: 'Teléfono *',
      type: 'text',
      placeholder: 'Ej: 3001234567',
      required: true,
      cols: 6 
    },
    {
  type: 'separator',
  label: 'Datos de Contacto'
},
    {
      name: 'contactoEmergenciaNombre',
      label: 'Nombre Contacto Emergencia',
      type: 'text',
      placeholder: 'Ej: María García',
      maxLength: 200,
      cols: 6 
    },
    {
      name: 'contactoEmergenciaTelefono',
      label: 'Teléfono Contacto Emergencia',
      type: 'text',
      placeholder: 'Ej: 3007654321',
      maxLength: 15,
      cols: 6 
    }
  ];

  ngOnInit() {
    this.token = localStorage.getItem('token');
    
    if (!this.token) {
      this.mensaje = '❌ No hay token de autenticación. Por favor inicia sesión primero.';
      this.esError = true;
      console.error('❌ Token no encontrado en localStorage');
    } else {
      console.log('✅ Token encontrado, formulario listo para crear persona');
    }
  }

  onSubmit(values: any) {
    console.log('📦 Datos del formulario:', values);

    if (!this.token) {
      this.mensaje = '❌ Error: No hay token de autenticación';
      this.esError = true;
      return;
    }

    if (!this.personaForm.valid) {
      this.mensaje = '❌ Por favor completa todos los campos requeridos';
      this.esError = true;
      console.error('❌ Formulario inválido:', this.personaForm.errors);
      return;
    }

    this.cargando = true;
    this.mensaje = 'Creando persona...';
    this.esError = false;

    // Preparar el objeto Persona para enviar al backend
    // IMPORTANTE: Formatear la fecha para el backend
    const fechaNacimientoFormateada = this.formatearFechaParaBackend(values.fechaNacimiento);
    
    const personaData: Persona = {
      numeroDocumento: values.numeroDocumento,
      tipoDocumentoId: Number(values.tipoDocumentoId),
      nombres: values.nombres,
      apellidos: values.apellidos,
      telefono: values.telefono,
      fechaNacimiento: fechaNacimientoFormateada, // Fecha formateada
      genero: values.genero || undefined,
      contactoEmergenciaNombre: values.contactoEmergenciaNombre || undefined,
      contactoEmergenciaTelefono: values.contactoEmergenciaTelefono || undefined,
      fotoUrl: values.fotoUrl || undefined
    };

    console.log('🚀 Enviando datos al backend:', personaData);
    console.log('📡 URL: POST http://localhost:8080/api/personas');
    console.log('📅 Fecha de nacimiento enviada:', fechaNacimientoFormateada);

    this.personaService.crearPersona(personaData).subscribe({
      next: (personaCreada) => {
        console.log('✅ Persona creada exitosamente:', personaCreada);
        this.cargando = false;
        this.mensaje = `✅ Persona "${personaCreada.nombres} ${personaCreada.apellidos}" creada exitosamente con ID: ${personaCreada.id}`;
        this.esError = false;
        
        // Limpiar formulario después de éxito
        this.personaForm.reset();
        
        // Redirigir después de 2 segundos a residentes
        setTimeout(() => {
          this.irAResidentes();
        }, 2000);
      },
      error: (error) => {
        console.error('❌ Error al crear persona:', error);
        this.cargando = false;
        
        if (error.status === 400) {
          this.mensaje = '❌ Error de validación: Verifica los datos ingresados';
        } else if (error.status === 409) {
          this.mensaje = '❌ El número de documento ya existe';
        } else if (error.status === 401) {
          this.mensaje = '❌ No autorizado: Token inválido o expirado';
        } else {
          this.mensaje = `❌ Error del servidor: ${error.message || 'Error desconocido'}`;
        }
        
        this.esError = true;
        
        // Debug detallado
        console.error('🔍 Detalles del error:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          error: error.error
        });
      }
    });
  }

  // Método para formatear la fecha al formato que espera el backend (YYYY-MM-DD)
  private formatearFechaParaBackend(fecha: string): string {
    if (!fecha) return '';
    
    // El input date ya devuelve YYYY-MM-DD, pero nos aseguramos
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  // Navegación - Volver al Login
  volverAlLogin() {
    console.log('🔙 Navegando al login');
    this.router.navigate(['/login2']);
  }

  // Navegación - Ir a Residentes
  irAResidentes() {
    console.log('➡️ Navegando a residentes');
    this.router.navigate(['/residentes']);
  }

  contarCamposLlenos(): number {
    const values = this.personaForm.value;
    let count = 0;
    
    Object.keys(values).forEach(key => {
      const valor = values[key as keyof typeof values];
      if (valor !== null && valor !== undefined && valor !== '') {
        count++;
      }
    });
    
    return count;
  }
}