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
passengers = 0

ngOnInit(){
  if(this.policy){
    this.passengers = parseInt(this.policy.auto_insurance?.places_cabine) - 1
    console.log('count: %d', this.passengers)
  }

}
}
