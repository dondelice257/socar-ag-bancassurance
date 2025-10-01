import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transport-contract',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './transport-contract.component.html',
  styleUrl: './transport-contract.component.scss'
})
export class TransportContractComponent {


  @Input() policy :any
    charges:number = 0


  ngOnInit(){
    if(this.policy){
      this.charges = Number(this.policy.charges_arca) + Number(this.policy.charges_diverses)
    }
  }
}
