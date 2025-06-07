import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-credit-contrat',
  standalone: true,
  imports: [
    CommonModule,
    QRCodeModule,

  ],
  templateUrl: './credit-contrat.component.html',
  styleUrl: './credit-contrat.component.scss'
})
export class CreditContratComponent {
  @Input() policy :any


  qrCodeData: string='';

  constructor() {
    // Create a JSON object with the data you want to include

    if(this.policy){
          const qrData = {
      policyNumber: this.policy.credit_insurance?.policy_number,
      assureur: this.policy.credit_insurance?.members[0].full_name,
      banque: this.policy.agency?.name,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Convert to string for QR code
    this.qrCodeData = JSON.stringify(qrData);
    }

  }

}
