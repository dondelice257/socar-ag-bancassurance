import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credit-condition',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './credit-condition.component.html',
  styleUrl: './credit-condition.component.scss'
})
export class CreditConditionComponent {
@Input() policy:any
}
