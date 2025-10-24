import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-metricas',
  standalone: true,
  imports: [CommonModule], // ✅ necesario para usar ngStyle, ngIf, etc.
  templateUrl: './card-metricas.html',
  styleUrls: ['./card-metricas.css']
})
export class CardMetricasComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() value!: string | number;
  @Input() color: string = '#4ade80';
}
