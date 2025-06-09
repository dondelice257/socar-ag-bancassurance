import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-credit-condition',
  standalone: true,
  imports: [
    CommonModule,
    QRCodeModule,

  ],
  templateUrl: './credit-condition.component.html',
  styleUrl: './credit-condition.component.scss'
})
export class CreditConditionComponent {
@Input() policy:any
}
