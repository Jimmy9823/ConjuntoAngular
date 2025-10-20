import { Component, Input } from '@angular/core';
import { Imports_ } from '../imports';

@Component({
  selector: 'app-tabla',
  imports: [Imports_],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css'
})
export class Tabla {
  @Input() columns: { key: string, label: string }[] = [];
  @Input() data: any[] = [];
}
