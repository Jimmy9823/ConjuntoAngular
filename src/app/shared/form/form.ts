import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Imports_ } from '../imports';
import { Boton } from '../boton/boton';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [Imports_],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {

  @Input() fields: any[] = [];
  @Input() disableSubmit: boolean = false;
  
  @Input() formGroup!: FormGroup; // ✅ Recibe el FormGroup desde el padre

  @Output() submitForm = new EventEmitter<any>();
  @Output() valueChanges = new EventEmitter<any>();

  // Nuevos inputs para configurar el botón
  @Input() showSubmitButton: boolean = true; // Mostrar/ocultar botón
  @Input() submitButtonText: string = 'Enviar'; // Texto del botón
  @Input() submitButtonIcon: string = 'fa fa-paper-plane'; // Icono del botón

  ngOnInit() {
    if (!this.formGroup) {
      console.error('❌ ERROR: Debes pasar un FormGroup desde el componente padre');
    } else {
      this.formGroup.valueChanges.subscribe(value => {
        this.valueChanges.emit(value);
      });
    }
  }

  onSubmit() {
    if (this.disableSubmit) return;
    if (this.formGroup && this.formGroup.valid) {
      this.submitForm.emit(this.formGroup.value);
    }
  }
}
