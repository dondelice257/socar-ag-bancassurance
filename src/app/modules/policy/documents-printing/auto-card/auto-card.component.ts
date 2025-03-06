import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-auto-card',
  standalone: true,
  imports: [
    CommonModule,
    NgxPrintModule
  ],
  templateUrl: './auto-card.component.html',
  styleUrl: './auto-card.component.scss'
})
export class AutoCardComponent {
@Input() policy :any
}
