import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-card-metricas-main',
  imports: [],
  templateUrl: './card-metricas-main.html',
  styleUrl: './card-metricas-main.css'
})
export class CardMetricasMain {
@Input() icon!: string;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() value!: string | number;
  @Input() customClass: string = '';
}
