import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bill-print',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './bill-print.component.html',
  styleUrl: './bill-print.component.scss'
})
export class BillPrintComponent {
  @Input() policy :any

}
