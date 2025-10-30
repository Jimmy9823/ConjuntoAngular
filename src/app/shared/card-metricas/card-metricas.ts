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
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() iconColor?: string;
  @Input() iconBg?: string;
  @Input() customClass?: string;
}
