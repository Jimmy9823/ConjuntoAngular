import { Component, EventEmitter, Output } from '@angular/core';
import { Form } from '../../../shared/form/form';
import { Modals } from '../../../shared/modals/modals';

@Component({
  selector: 'app-registrar-vehiculo',
  imports: [Form,Modals],
  templateUrl: './registrar-vehiculo.html',
  styleUrl: './registrar-vehiculo.css'
})
export class RegistrarVehiculo {
  @Output() cerrar = new EventEmitter<void>();
  @Output() registrar = new EventEmitter<any>();

  visible = false;

  camposVehiculo = [
    { type: 'text', name: 'marca', label: 'Marca del vehículo' },
    { type: 'text', name: 'modelo', label: 'Modelo' },
    { type: 'text', name: 'anio', label: 'Año' },
    { type: 'select', name: 'tipo', label: 'Tipo', options: ['Automóvil', 'Motocicleta', 'Camioneta'] },
    { type: 'text', name: 'placa', label: 'Placa' },
    { type: 'text', name: 'propietario', label: 'Propietario' },
    { type: 'text', name: 'apartamento', label: 'Apartamento' },
    { type: 'select', name: 'estado', label: 'Estado', options: ['Activo', 'Inactivo'] },
  ];

  abrir() {
    this.visible = true;
  }

  cerrarModal() {
    this.visible = false;
    this.cerrar.emit();
  }

  guardarVehiculo(data: any) {
    this.registrar.emit(data);
    this.cerrarModal();
  }

}
