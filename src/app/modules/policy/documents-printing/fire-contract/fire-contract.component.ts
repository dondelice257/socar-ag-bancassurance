import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fire-contract',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fire-contract.component.html',
  styleUrl: './fire-contract.component.scss'
})
export class FireContractComponent {


  @Input() policy :any
  charges:number = 0


  ngOnInit(){
    if(this.policy){
      this.charges = Number(this.policy.charges_arca) + Number(this.policy.charges_diverses)
    }
  }
}
