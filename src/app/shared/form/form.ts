import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Imports_ } from '../imports';
import { Boton } from '../boton/boton';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-form',
  imports: [Imports_, Boton],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  @Input() fields: any[] = [];
 @Output() submitForm = new EventEmitter<any>();
  formGroup!: FormGroup;

  ngOnInit() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = new FormControl('');
    });
    this.formGroup = new FormGroup(group);
  }

  onSubmit() {
    this.submitForm.emit(this.formGroup.value);
  }
}
