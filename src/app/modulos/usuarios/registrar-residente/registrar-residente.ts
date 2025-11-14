

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResidenteService } from '../servicios/residente.service';
import { PersonaService } from '../servicios/persona.service';
import { Form } from '../../../shared/form/form';
import {Residente, ResidenteFormData, OpcionesResidente } from '../modelos/residente.model';
import { Boton } from '../../../shared/boton/boton';

@Component({
selector: 'app-registrar-residente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Form,Boton],
  templateUrl: './registrar-residente.html',
  styleUrl: './registrar-residente.css'
})
export class CrearResidente implements OnInit {
  private residenteService = inject(ResidenteService);
  private personaService = inject(PersonaService);
  private router = inject(Router);

  // FormGroup para crear residente
  residenteForm = new FormGroup({
    personaId: new FormControl('', Validators.required),
    apartamentoId: new FormControl('', Validators.required),
    tipoResidenteId: new FormControl('', Validators.required),
    estadoId: new FormControl('', Validators.required),
    usuarioId: new FormControl(''),
    esResponsablePrincipal: new FormControl(false),
    fechaInicio: new FormControl('', Validators.required),
    fechaFin: new FormControl(''),
    observaciones: new FormControl('')
  });

  cargando = false;
  mensaje = '';
  esError = false;
  token: string | null = null;

  // Opciones para los selects (deberían venir del backend)
  opciones: OpcionesResidente = {
    tiposResidente: [
      { value: 1, text: 'Propietario' },
      { value: 2, text: 'Arrendatario' },
      { value: 3, text: 'Familiar' },
      { value: 4, text: 'Visitante' }
    ],
    estadosResidente: [
      { value: 1, text: 'Activo' },
      { value: 2, text: 'Inactivo' },
      { value: 3, text: 'Pendiente' },
      { value: 4, text: 'Suspendido' }
    ],
    apartamentos: [
      { value: 1, text: 'Apto 101', torre: 'Torre 1' },
      { value: 2, text: 'Apto 102', torre: 'Torre 1' },
      { value: 3, text: 'Apto 201', torre: 'Torre 2' },
      { value: 4, text: 'Apto 202', torre: 'Torre 2' }
    ],
    personas: [] // Se cargará desde el servicio
  };

  // Fields para el formulario reutilizable
  fields = [
    {
      name: 'personaId',
      label: 'Persona *',
      type: 'select',
      options: this.opciones.personas,
      required: true,
      description: 'Seleccione la persona que será residente'
    },
    {
      name: 'apartamentoId',
      label: 'Apartamento *',
      type: 'select',
      options: this.opciones.apartamentos.map(apt => ({
        value: apt.value,
        text: `${apt.text} - ${apt.torre}`
      })),
      required: true
    },
    {
      name: 'tipoResidenteId',
      label: 'Tipo de Residente *',
      type: 'select',
      options: this.opciones.tiposResidente,
      required: true
    },
    {
      name: 'estadoId',
      label: 'Estado *',
      type: 'select',
      options: this.opciones.estadosResidente,
      required: true
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio *',
      type: 'date',
      required: true
    },
    {
      name: 'fechaFin',
      label: 'Fecha de Fin (Opcional)',
      type: 'date',
      description: 'Solo si es una residencia temporal'
    },
    {
      name: 'esResponsablePrincipal',
      label: '¿Es responsable principal?',
      type: 'radio',
      options: [
        { value: true, text: 'Sí' },
        { value: false, text: 'No' }
      ]
    },
    {
      name: 'observaciones',
      label: 'Observaciones',
      type: 'textarea',
      placeholder: 'Información adicional sobre el residente...'
    }
  ];

  ngOnInit() {
    this.token = localStorage.getItem('token');
    
    if (!this.token) {
      this.mensaje = '❌ No hay token de autenticación. Por favor inicia sesión primero.';
      this.esError = true;
      console.error('❌ Token no encontrado en localStorage');
      return;
    }

    console.log('✅ Token encontrado, cargando datos para formulario de residente');
    this.cargarPersonas();
    this.cargarOpcionesDelBackend(); // En una implementación real, esto cargaría desde APIs
  }

  cargarPersonas() {
    console.log('👥 Cargando lista de personas...');
    this.personaService.listarPersonas().subscribe({
      next: (personas) => {
        this.opciones.personas = personas.map(persona => ({
          value: persona.id!,
          text: `${persona.nombres} ${persona.apellidos}`,
          documento: persona.numeroDocumento
        }));
        console.log(`✅ ${personas.length} personas cargadas`);
        
        // Actualizar el field de personas
        const personaFieldIndex = this.fields.findIndex(f => f.name === 'personaId');
        if (personaFieldIndex !== -1) {
          this.fields[personaFieldIndex].options = this.opciones.personas;
        }
      },
      error: (error) => {
        console.error('❌ Error al cargar personas:', error);
        this.mensaje = '❌ Error al cargar la lista de personas';
        this.esError = true;
      }
    });
  }

  cargarOpcionesDelBackend() {
    // TODO: En una implementación real, aquí cargarías:
    // - Tipos de residente desde /api/tipos-residente
    // - Estados desde /api/estados-residente
    // - Apartamentos desde /api/apartamentos
    console.log('📡 Cargando opciones del backend...');
  }

  onSubmit(values: any) {
  console.log('📦 Datos del formulario de residente:', values);

  if (!this.token) {
    this.mensaje = '❌ Error: No hay token de autenticación';
    this.esError = true;
    return;
  }

  if (!this.residenteForm.valid) {
    this.mensaje = '❌ Por favor completa todos los campos requeridos';
    this.esError = true;
    console.error('❌ Formulario inválido:', this.residenteForm.errors);
    return;
  }

  this.cargando = true;
  this.mensaje = 'Creando residente...';
  this.esError = false;

  // 🔥 CORRECCIÓN: Enviar solo los campos que el backend espera
  const residenteData = {
    personaId: Number(values.personaId),
    apartamentoId: Number(values.apartamentoId),
    tipoResidenteId: Number(values.tipoResidenteId),
    estadoId: Number(values.estadoId),
    esResponsablePrincipal: values.esResponsablePrincipal || false,
    fechaInicio: values.fechaInicio
    // ❌ NO enviar: fechaFin, observaciones, usuarioId (por ahora)
  };

  console.log('🚀 Enviando datos al backend (SIMPLIFICADO):', residenteData);
  console.log('📡 URL: POST http://localhost:8080/api/residentes');
  console.log('🔐 Token que se enviará:', this.token);

  this.residenteService.crearResidente(residenteData).subscribe({
    next: (residenteCreado) => {
      console.log('✅ Residente creado exitosamente:', residenteCreado);
      this.cargando = false;
      this.mensaje = `✅ Residente creado exitosamente con ID: ${residenteCreado.id}`;
      this.esError = false;
      
      this.residenteForm.reset();
      
      setTimeout(() => {
        this.irAListaResidentes();
      }, 2000);
    },
    error: (error) => {
      console.error('❌ Error al crear residente:', error);
      this.cargando = false;
      
      // Debug más detallado
      console.log('🔍 Estado del token:', this.token ? 'PRESENTE' : 'FALTANTE');
      console.log('🔍 Longitud del token:', this.token?.length);
      console.log('🔍 Headers que se enviaron:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
      
      if (error.status === 405) {
        this.mensaje = '❌ Error 405: Método no permitido. Verifica el endpoint en el backend.';
      } else if (error.status === 400) {
        this.mensaje = '❌ Error de validación: Verifica los datos ingresados';
      } else if (error.status === 401) {
        this.mensaje = '❌ No autorizado: Token inválido o expirado';
      } else {
        this.mensaje = `❌ Error del servidor: ${error.message || 'Error desconocido'}`;
      }
      
      this.esError = true;
    }
  });
}

  // Navegación
  volverALogin() {
    console.log('🔙 Navegando al login');
    this.router.navigate(['/login']);
  }

  irAListaResidentes() {
    console.log('📋 Navegando a lista de residentes');
    this.router.navigate(['/residentes']);
  }

  irACrearPersona() {
    console.log('👤 Navegando a crear persona');
    this.router.navigate(['/personas/crear']);
  }

  contarCamposLlenos(): number {
    const values = this.residenteForm.value;
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