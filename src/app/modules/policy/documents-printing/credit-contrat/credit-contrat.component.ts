import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credit-contrat',
  standalone: true,
  imports: [],
  templateUrl: './credit-contrat.component.html',
  styleUrl: './credit-contrat.component.scss'
})
export class CreditContratComponent {
  @Input() policy :any

}
