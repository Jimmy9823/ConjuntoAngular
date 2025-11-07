import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonaService } from '../servicios/persona.service'; // Ajusta la ruta según tu estructura
import { Persona } from '../modelos/persona.model'; // Ajusta la ruta según tu estructura
import { Tabla } from '../../../shared/tabla/tabla'; // Ajusta la ruta según tu estructura
import { Form } from '../../../shared/form/form'; // Ajusta la ruta según tu estructura
import { Imports_ } from '../../../shared/imports';

@Component({
  selector: 'app-lista-personas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Tabla, Form, Imports_],
  templateUrl: './listar-usuarios.html',
  styleUrls: ['./listar-usuarios.css']
})
export class ListaPersonasFiltros implements OnInit {
  private personaService = inject(PersonaService);

  personas: Persona[] = [];
  cargando = false;
  mensaje = '';
  esError = false;
  token: string | null = null;

  // FormGroup para los filtros
  filtroForm = new FormGroup({
    tipoFiltro: new FormControl('todos', Validators.required),
    subFiltro: new FormControl(''),
    valorBusqueda: new FormControl('')
  });

  // Opciones para el select principal de filtros
  opcionesFiltro = [
    { value: 'todos', text: 'Listar todas las personas' },
    { value: 'id', text: 'Buscar por ID' },
    { value: 'documento', text: 'Buscar por documento' },
    { value: 'tipoDocumento', text: 'Buscar por tipo de documento' },
    { value: 'genero', text: 'Buscar por género' },
    { value: 'nombre', text: 'Buscar por nombre' },
    { value: 'buscar', text: 'Búsqueda general' },
    { value: 'rangoEdad', text: 'Buscar por rango de edad' },
    { value: 'rangoFechaNacimiento', text: 'Buscar por fecha de nacimiento' },
    { value: 'mayoresEdad', text: 'Personas mayores de edad' },
    { value: 'menoresEdad', text: 'Personas menores de edad' },
    { value: 'sinResidencias', text: 'Personas sin residencias' },
    { value: 'conResidencias', text: 'Personas con residencias' },
    { value: 'contactoEmergencia', text: 'Buscar por contacto de emergencia' }
  ];

  // Opciones para sub-filtros
  opcionesGenero = [
    { value: 'M', text: 'Masculino' },
    { value: 'F', text: 'Femenino' }
  ];

  // TODO: Esto debería venir del backend
  opcionesTipoDocumento = [
    { value: 1, text: 'Cédula de Ciudadanía' },
    { value: 2, text: 'Cédula de Extranjería' },
    { value: 3, text: 'Pasaporte' },
    { value: 4, text: 'Tarjeta de Identidad' }
  ];

  // Fields para el formulario reutilizable
  fields: any[] = [];

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

    // Inicializar los fields del formulario
    this.actualizarFields();

    // Suscribirse a cambios en el tipo de filtro
    this.filtroForm.get('tipoFiltro')?.valueChanges.subscribe(() => {
      this.actualizarFields();
      this.limpiarCamposAdicionales();
    });

    // Cargar todas las personas al iniciar
    this.cargarTodasPersonas();
  }

  actualizarFields() {
    const tipoFiltro = this.filtroForm.get('tipoFiltro')?.value;

    // Campos base
    this.fields = [
      {
        name: 'tipoFiltro',
        label: 'Tipo de búsqueda',
        type: 'select',
        options: this.opcionesFiltro
      }
    ];

    console.log('🔄 Actualizando fields para filtro:', tipoFiltro);

    // Campos adicionales según el tipo de filtro
    switch (tipoFiltro) {
      case 'todos':
      case 'mayoresEdad':
      case 'menoresEdad':
      case 'sinResidencias':
      case 'conResidencias':
        // No necesita campos adicionales
        console.log('✅ Filtro sin campos adicionales');
        break;

      case 'id':
        this.fields.push({
          name: 'valorBusqueda',
          label: 'ID de la persona',
          type: 'text', // Cambiado a text para mejor compatibilidad
          placeholder: 'Ej: 1, 2, 3...'
        });
        console.log('✅ Agregado campo para ID');
        break;

      case 'documento':
        this.fields.push({
          name: 'valorBusqueda',
          label: 'Número de documento',
          type: 'text',
          placeholder: 'Ej: 123456789'
        });
        console.log('✅ Agregado campo para documento');
        break;

      case 'tipoDocumento':
        this.fields.push({
          name: 'subFiltro',
          label: 'Tipo de documento',
          type: 'select',
          options: this.opcionesTipoDocumento
        });
        console.log('✅ Agregado select para tipo documento');
        break;

      case 'genero':
        this.fields.push({
          name: 'subFiltro',
          label: 'Género',
          type: 'select',
          options: this.opcionesGenero
        });
        console.log('✅ Agregado select para género');
        break;

      case 'nombre':
        this.fields.push({
          name: 'valorBusqueda',
          label: 'Nombre a buscar',
          type: 'text',
          placeholder: 'Ej: Juan, María...'
        });
        console.log('✅ Agregado campo para nombre');
        break;

      case 'buscar':
        this.fields.push({
          name: 'valorBusqueda',
          label: 'Término de búsqueda',
          type: 'text',
          placeholder: 'Buscar en nombres, documentos, teléfonos...'
        });
        console.log('✅ Agregado campo para búsqueda general');
        break;

      case 'rangoEdad':
        this.fields.push(
          {
            name: 'subFiltro',
            label: 'Edad mínima',
            type: 'text', // Cambiado a text para mejor compatibilidad
            placeholder: 'Ej: 18'
          },
          {
            name: 'valorBusqueda',
            label: 'Edad máxima',
            type: 'text', // Cambiado a text para mejor compatibilidad
            placeholder: 'Ej: 65'
          }
        );
        console.log('✅ Agregados campos para rango de edad');
        break;

      case 'rangoFechaNacimiento':
        this.fields.push(
          {
            name: 'subFiltro',
            label: 'Fecha inicio',
            type: 'text', // Cambiado a text para mejor compatibilidad
            placeholder: 'YYYY-MM-DD'
          },
          {
            name: 'valorBusqueda',
            label: 'Fecha fin',
            type: 'text', // Cambiado a text para mejor compatibilidad
            placeholder: 'YYYY-MM-DD'
          }
        );
        console.log('✅ Agregados campos para rango de fecha');
        break;

      case 'contactoEmergencia':
        this.fields.push({
          name: 'valorBusqueda',
          label: 'Nombre o teléfono de contacto',
          type: 'text',
          placeholder: 'Ej: María, 3001234567...'
        });
        console.log('✅ Agregado campo para contacto emergencia');
        break;
    }

    console.log('🔄 Fields finales:', this.fields);
  }

  limpiarCamposAdicionales() {
    this.filtroForm.patchValue({
      subFiltro: '',
      valorBusqueda: ''
    });
    console.log('🧹 Campos adicionales limpiados');
  }

  onSubmitFiltro(values: any) {
    console.log('🔍 Valores del formulario de filtro:', values);

    const tipoFiltro = values.tipoFiltro;
    const subFiltro = values.subFiltro;
    const valorBusqueda = values.valorBusqueda;

    this.cargando = true;
    this.mensaje = 'Buscando...';
    this.esError = false;

    console.log(`🎯 Ejecutando filtro: ${tipoFiltro}`);
    console.log(`📊 Subfiltro: ${subFiltro}, Valor: ${valorBusqueda}`);

    // Llamar al método correspondiente del servicio
    switch (tipoFiltro) {
      case 'todos':
        this.cargarTodasPersonas();
        break;
      case 'id':
        this.buscarPorId(valorBusqueda);
        break;
      case 'documento':
        this.buscarPorDocumento(valorBusqueda);
        break;
      case 'tipoDocumento':
        this.buscarPorTipoDocumento(subFiltro);
        break;
      case 'genero':
        this.buscarPorGenero(subFiltro);
        break;
      case 'nombre':
        this.buscarPorNombre(valorBusqueda);
        break;
      case 'buscar':
        this.buscarGeneral(valorBusqueda);
        break;
      case 'rangoEdad':
        this.buscarPorRangoEdad(subFiltro, valorBusqueda);
        break;
      case 'rangoFechaNacimiento':
        this.buscarPorRangoFechaNacimiento(subFiltro, valorBusqueda);
        break;
      case 'mayoresEdad':
        this.buscarMayoresEdad();
        break;
      case 'menoresEdad':
        this.buscarMenoresEdad();
        break;
      case 'sinResidencias':
        this.buscarSinResidencias();
        break;
      case 'conResidencias':
        this.buscarConResidencias();
        break;
      case 'contactoEmergencia':
        this.buscarPorContactoEmergencia(valorBusqueda);
        break;
      default:
        this.mensaje = '❌ Tipo de filtro no válido';
        this.esError = true;
        this.cargando = false;
        console.error('❌ Tipo de filtro no reconocido:', tipoFiltro);
    }
  }

  // MÉTODOS DE BÚSQUEDA CORREGIDOS

  cargarTodasPersonas() {
    console.log('📋 Solicitando listado completo de personas...');
    this.personaService.listarPersonas().subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se cargaron ${personas.length} personas correctamente`;
        console.log('✅ Personas cargadas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al cargar personas: ${error.message}`;
        this.esError = true;
        console.error('❌ Error completo:', error);
      }
    });
  }

  buscarPorId(id: string) {
    const idNumero = Number(id);
    console.log(`🔍 Buscando persona por ID: ${id} (convertido a: ${idNumero})`);
    console.log(`📡 Enviando solicitud a: /api/personas/${idNumero}`);
    
    this.personaService.obtenerPersonaPorId(idNumero).subscribe({
      next: (persona) => {
        this.personas = [persona];
        this.cargando = false;
        this.mensaje = `✅ Persona con ID ${idNumero} encontrada`;
        console.log('✅ Persona encontrada:', persona);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar por ID: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda por ID:', error);
      }
    });
  }

  buscarPorDocumento(documento: string) {
    console.log(`🔍 Buscando persona por documento: ${documento}`);
    console.log(`📡 Enviando solicitud a: /api/personas/documento/${documento}`);
    
    this.personaService.obtenerPersonaPorDocumento(documento).subscribe({
      next: (persona) => {
        this.personas = [persona];
        this.cargando = false;
        this.mensaje = `✅ Persona con documento ${documento} encontrada`;
        console.log('✅ Persona encontrada:', persona);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar por documento: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda por documento:', error);
      }
    });
  }

  buscarPorTipoDocumento(tipoDocumentoId: string) {
    const tipoDocIdNumero = Number(tipoDocumentoId);
    console.log(`🔍 Buscando personas por tipo documento ID: ${tipoDocIdNumero}`);
    console.log(`📡 Enviando solicitud a: /api/personas/tipo-documento/${tipoDocIdNumero}`);
    
    this.personaService.obtenerPersonasPorTipoDocumento(tipoDocIdNumero).subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas con el tipo de documento seleccionado`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar por tipo documento: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda por tipo documento:', error);
      }
    });
  }

  buscarPorGenero(genero: string) {
    console.log(`🔍 Buscando personas por género: ${genero}`);
    console.log(`📡 Enviando solicitud a: /api/personas/genero/${genero}`);
    
    this.personaService.obtenerPersonasPorGenero(genero).subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas del género ${genero}`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar por género: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda por género:', error);
      }
    });
  }

  buscarPorNombre(nombre: string) {
    console.log(`🔍 Buscando personas por nombre: ${nombre}`);
    console.log(`📡 Enviando solicitud a: /api/personas/nombre?nombre=${nombre}`);
    
    this.personaService.buscarPersonasPorNombre(nombre).subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas con el nombre "${nombre}"`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar por nombre: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda por nombre:', error);
      }
    });
  }

  buscarGeneral(termino: string) {
    console.log(`🔍 Búsqueda general con término: ${termino}`);
    console.log(`📡 Enviando solicitud a: /api/personas/buscar?termino=${termino}`);
    
    this.personaService.buscarPersonas(termino).subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas con el término "${termino}"`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error en búsqueda general: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda general:', error);
      }
    });
  }

  buscarPorRangoEdad(edadMin: string, edadMax: string) {
    const edadMinNum = Number(edadMin);
    const edadMaxNum = Number(edadMax);
    
    console.log(`🔍 Buscando personas por rango de edad: ${edadMinNum} - ${edadMaxNum}`);
    console.log(`📡 Enviando solicitud a: /api/personas/rango-edad?edadMin=${edadMinNum}&edadMax=${edadMaxNum}`);
    
    this.personaService.obtenerPersonasPorRangoEdad(edadMinNum, edadMaxNum).subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas en el rango de edad ${edadMinNum} - ${edadMaxNum}`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar por rango de edad: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda por rango de edad:', error);
      }
    });
  }

  buscarPorRangoFechaNacimiento(fechaInicio: string, fechaFin: string) {
    console.log(`🔍 Buscando personas por rango de fecha: ${fechaInicio} - ${fechaFin}`);
    console.log(`📡 Enviando solicitud a: /api/personas/rango-fecha-nacimiento?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    
    this.personaService.obtenerPersonasPorRangoFechaNacimiento(fechaInicio, fechaFin).subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas en el rango de fechas`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar por rango de fecha: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda por rango de fecha:', error);
      }
    });
  }

  buscarMayoresEdad() {
    console.log('🔍 Buscando personas mayores de edad');
    console.log('📡 Enviando solicitud a: /api/personas/mayores-edad');
    
    this.personaService.obtenerPersonasMayoresDeEdad().subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas mayores de edad`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar mayores de edad: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda de mayores de edad:', error);
      }
    });
  }

  buscarMenoresEdad() {
    console.log('🔍 Buscando personas menores de edad');
    console.log('📡 Enviando solicitud a: /api/personas/menores-edad');
    
    this.personaService.obtenerPersonasMenoresDeEdad().subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas menores de edad`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar menores de edad: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda de menores de edad:', error);
      }
    });
  }

  buscarSinResidencias() {
    console.log('🔍 Buscando personas sin residencias');
    console.log('📡 Enviando solicitud a: /api/personas/sin-residencias');
    
    this.personaService.obtenerPersonasSinResidencias().subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas sin residencias`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar personas sin residencias: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda de personas sin residencias:', error);
      }
    });
  }

  buscarConResidencias() {
    console.log('🔍 Buscando personas con residencias');
    console.log('📡 Enviando solicitud a: /api/personas/con-residencias');
    
    this.personaService.obtenerPersonasConResidencias().subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas con residencias`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar personas con residencias: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda de personas con residencias:', error);
      }
    });
  }

  buscarPorContactoEmergencia(termino: string) {
    console.log(`🔍 Buscando por contacto de emergencia: ${termino}`);
    console.log(`📡 Enviando solicitud a: /api/personas/contacto-emergencia?termino=${termino}`);
    
    this.personaService.buscarPorContactoEmergencia(termino).subscribe({
      next: (personas) => {
        this.personas = personas;
        this.cargando = false;
        this.mensaje = `✅ Se encontraron ${personas.length} personas con contacto de emergencia "${termino}"`;
        console.log('✅ Personas encontradas:', personas);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = `❌ Error al buscar por contacto de emergencia: ${error.message}`;
        this.esError = true;
        console.error('❌ Error en búsqueda por contacto de emergencia:', error);
      }
    });
  }
}