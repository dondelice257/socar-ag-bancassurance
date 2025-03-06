import { Component } from '@angular/core';
import { PolicyService } from '../../../core/services/policy.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LookupComponent } from '../../../shared/components/reusable/lookup/lookup.component';

@Component({
  selector: 'app-policy-renew',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    LookupComponent
  ],
  templateUrl: './policy-renew.component.html',
  styleUrl: './policy-renew.component.scss'
})
export class PolicyRenewComponent {
  renewForm:FormGroup
  isLoading: boolean = false;
  policyId: any;



  constructor(
    private policyService : PolicyService,
    private router : Router,
    private fb: FormBuilder,
  ){
    // Initialize main policy form with validations
    this.renewForm = this.fb.group({
      issue_date: ['', Validators.required],
      period_id: ['', Validators.required],
      previous_policy_id: ['', Validators.required],

      assured_capital_bif: [0, Validators.required],
    });
  }



  renewPolicy(): void {

  
    this.isLoading = true;
  
  
  
    this.policyService.doPolicyAction(this.policyId, 'renew', this.renewForm.value)
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          console.log('Policy action successful:', data);
          this.router.navigateByUrl('/policy/list');
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Policy action failed:', error);
          // Optionally, display an error message to the user
        }
      });
  }

  onPolicySelected(policy: any) {
    this.policyId = policy.lookup_title;
    this.renewForm.patchValue({previous_policy_id: this.policyId});
  }
}
