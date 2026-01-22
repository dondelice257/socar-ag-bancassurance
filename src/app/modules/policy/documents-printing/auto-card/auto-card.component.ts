import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { PolicyService } from '../../../../core/services/policy.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
policyService = inject(PolicyService)
toastService = inject(ToastrService)
router = inject(Router)

ngOnInit(){
  if(this.policy){
    this.passengers = parseInt(this.policy.auto_insurance?.places_cabine) - 1
    console.log('count: %d', this.passengers)
  }

}

markAsUsed(){
  this.policyService.markVignetteUsed(this.policy.auto_insurance?.vignette_data?.id).subscribe((data:any)=>{
    console.log('Vignette marked as used', data)
    this.toastService.success('Vous venez de lancer l\'impression de la vignette de cette assurance, vous ne pourrez plus l\'imprimer à nouveau.', 'Succès')
    this.router.navigate(['/policy/list'])
  }, (error:any)=>{
    console.error('Error marking vignette as used', error)
    this.toastService.error('Erreur lors de la mise à jour du statut de la vignette.', 'Erreur')
  })
}
}
