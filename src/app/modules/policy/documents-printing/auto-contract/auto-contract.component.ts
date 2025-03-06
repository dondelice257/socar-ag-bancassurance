import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auto-contract',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './auto-contract.component.html',
  styleUrl: './auto-contract.component.scss'
})
export class AutoContractComponent {
  @Input() policy :any

}
