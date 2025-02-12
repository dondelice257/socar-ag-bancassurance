import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LookupComponent } from '../../../../shared/components/reusable/lookup/lookup.component';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../../../core/services/policy.service';
import { Observable } from 'rxjs';
import { AuthState } from '../../../../shared/states/auth/auth.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-new-insurance',
  standalone: true,
  imports: [
    LookupComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-insurance.component.html',
  styleUrl: './new-insurance.component.scss'
})
export class NewFireInsuranceComponent {
  step = 1;
  insuranceForm: FormGroup;
  guaranteeForm: FormGroup;
  connectedOperator$!:Observable<any> 

  connectedOperator: any;

  selectedClientId: string | null = null;
  selectedGuarantees: any[] = [];
  policyId: string | null = null;
  fireInsuranceId: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,

    private policyService: PolicyService
  ) {
    this.insuranceForm = this.fb.group({
      clientId: ['', Validators.required],
      nature: ['', Validators.required],
      quartier: ['', Validators.required],
      province: ['', Validators.required],
      cadastre: ['', Validators.required],
      titre: ['', Validators.required],
      startDate: ['', Validators.required],
      period: ['', Validators.required],
      customDays: [''],
      defaultAssuredCapital: ['', Validators.min(100000)],
    });

    this.guaranteeForm = this.fb.group({
      name: ['', Validators.required],
      assured_capital: ['', [Validators.required, Validators.min(1)]],
      percentage: ['', [Validators.required, Validators.max(100)]],

    });

this.connectedOperator$ = store.select(AuthState.connectedOperator)

  }

  ngOnInit(): void {
    this.connectedOperator$.subscribe((connectedOperator:any)=>{
      this.connectedOperator = connectedOperator 
      console.log('from operatorrr conneccttteedd', this.connectedOperator)


      if(!connectedOperator){
    // this.router.navigateByUrl('/login')

      }

//
    })
  }

  onClientSelected(clientId: any) {
    this.selectedClientId = clientId;
    this.insuranceForm.patchValue({ clientId: clientId.lookup_description });
  }

  onNext() {
    if (this.step === 1 && this.selectedClientId) {
      this.step++;
    } else if (this.step === 2 && this.insuranceForm.valid) {
      this.step++;
    }
  }

  onBack() {
    if (this.step > 1) this.step--;
  }

  createPolicy() {
        this.isSubmitting = true;

    const data = { 
      client: this.insuranceForm.value.clientId,
      issue_date: this.insuranceForm.value.startDate,
      custom_days: this.insuranceForm.value.customDays,

      operator: this.connectedOperator.id,
      company: this.connectedOperator.company.id,
      type: 'AAAA',
      period: 1,






    };
    this.isSubmitting = true;

    this.policyService.createPolicy(data).subscribe(
      (response: any) => {
        this.policyId = response.id;
        console.log('Policy created:', response);
        this.createFireInsurance();
      },
      (error) => {
        this.isSubmitting = false;
        console.error('Error creating policy:', error);
      }
    );
  }

  createFireInsurance() {
        this.isSubmitting = true;

    if (!this.policyId) return;

    const data = {
      policy: this.policyId,
      nature: this.insuranceForm.value.nature,
      quartier: this.insuranceForm.value.quartier,
      province: this.insuranceForm.value.province,
      cadastre: this.insuranceForm.value.cadastre,
      titre: this.insuranceForm.value.titre,
      assuredCapital: this.insuranceForm.value.defaultAssuredCapital,
    };

    this.policyService.createFireInsurance(data).subscribe(
      (response: any) => {
        this.fireInsuranceId = response.id;
        this.submitGuarantees()
        console.log('Fire insurance created:', response);
        this.isSubmitting = false;

      },
      (error) => {
        this.isSubmitting = false;
        console.error('Error creating fire insurance:', error);
      }
    );
  }

  addGuarantee() {

    if (this.guaranteeForm.valid) {
      const guarantee = {
        name: this.guaranteeForm.value.name,
        assured_capital: this.guaranteeForm.value.assured_capital,
        percentage: this.guaranteeForm.value.percentage,

      };
      
      this.selectedGuarantees.push(guarantee);
      
      // Reset fields after adding
      this.guaranteeForm.patchValue({
        name: '',
        assured_capital: '',
        percentage: '',
      });
    }
  }
  
  removeGuarantee(index: number) {
    this.selectedGuarantees.splice(index, 1);
  }
  

submitGuarantees() {
        this.isSubmitting = true;

  if (!this.fireInsuranceId) return;

  // Create a new array where each guarantee has the fireInsuranceId added
  const guaranteesWithInsurance = this.selectedGuarantees.map(guarantee => ({
    ...guarantee, // Spread the original guarantee object
    fire_insurance: this.fireInsuranceId // Add the fireInsuranceId field
  }));

  // Map each guarantee with the added field to a promise
  const promises = guaranteesWithInsurance.map(guarantee => {
    return this.policyService.createFireGuarantee(guarantee).toPromise(); // Pass the individual guarantee object
  });

  // Handle all promises
  Promise.all(promises)
    .then(responses => {
        this.isSubmitting = true;

      console.log('All guarantees submitted:', responses);
    })
    .catch(error => {
        this.isSubmitting = true;

      console.error('Error submitting guarantees:', error);
    });
}


  onSubmit() {
    if (!this.policyId) {
      this.createPolicy();
    } else if (!this.fireInsuranceId) {
      this.createFireInsurance();
    } else {
      this.submitGuarantees();
    }
  }
}
