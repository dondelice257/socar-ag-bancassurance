import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicyService } from '../../../core/services/policy.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LookupComponent } from '../../../shared/components/reusable/lookup/lookup.component';

@Component({
  selector: 'app-policy-perte-carte',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LookupComponent
  ],
  templateUrl: './policy-perte-carte.component.html',
  styleUrl: './policy-perte-carte.component.scss'
})
export class PolicyPerteCarteComponent {
  renewForm:FormGroup
  isLoading: boolean = false;
  policyId: any;
  minDate: string;



  constructor(
    private policyService : PolicyService,
    private router : Router,
    private fb: FormBuilder,
    private toastr : ToastrService
  ){
    // Initialize main policy form with validations
    this.renewForm = this.fb.group({
      previous_policy_id: ['', Validators.required],

    });

        const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }



  perteCarte(): void {
    this.isLoading = true;
  
    this.policyService.doPolicyActionForOnlyRenew(this.policyId, 'perte_carte', this.renewForm.value)
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          console.log('Renouvellement réussi:', data);
          this.toastr.success("Votre police a été renouvelée avec succès.", "Succès");
          this.router.navigateByUrl('/policy/list');
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Échec du renouvellement:', error);
          this.handleError(error);
        }
      });
  }
  

  onPolicySelected(policy: any) {
    this.policyId = policy.lookup_field5;
    this.renewForm.patchValue({previous_policy_id: this.policyId});
  }





  handleError(error: any) {
    console.error('Erreur API:', error);
  
    if (error?.status === 400 && error?.error) {
      const messages = Object.values(error.error).flat();
      messages.forEach((msg: any) => this.toastr.error(msg, 'Erreur côté utilisateur'));
    } 
    else if (error?.status === 403) {
      this.toastr.error("Vous n'avez pas l'autorisation d'effectuer cette action.", 'Accès refusé');
    }
    else if (error?.status === 500) {
      this.toastr.error("Une erreur interne du serveur s'est produite. Réessayez plus tard.", 'Erreur serveur');
    }
    else {
      this.toastr.error("Une erreur s'est produite. Veuillez contacter l'administrateur.", 'Erreur système');
    }
  }
  
}

