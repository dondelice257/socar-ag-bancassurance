import { Component } from '@angular/core';
import { LookupComponent } from '../../../shared/components/reusable/lookup/lookup.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { PolicyService } from '../../../core/services/policy.service';
import { AuthState } from '../../../shared/states/auth/auth.state';
import { AutoFormComponent } from '../../production/auto-form/auto-form.component';
import { FireFormComponent } from '../../production/fire-form/fire-form.component';
import { TransportFormComponent } from '../../production/transport-form/transport-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policy-form',
  standalone: true,
  imports: [
    LookupComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AutoFormComponent,
    FireFormComponent,
    TransportFormComponent,
    MatCardModule, 
    MatCheckboxModule, 
    FormsModule, 

  ],
  templateUrl: './policy-form.component.html',
  styleUrl: './policy-form.component.scss'
})
export class PolicyFormComponent {
  // Current step in the multi-step form
  step = 1;
  
  // Form group declarations for different parts of the policy creation process
  guaranteeForm: FormGroup;
  goodsForm: FormGroup;
  policyForm: FormGroup;
  
  // Converted capital amount in BIF currency
  capitalInBif = 0;
  
  // Observable for the currently logged-in operator
  connectedOperator$!: Observable<any>;
  connectedOperator: any;
  
  // Selected data storage
  selectedClientId: string | null = null;
  selectedGuarantees: any[] = [];
  selectedGoods: any[] = [];
  
  // IDs for created entities
  policyId: string | null = null;
  specificInsuranceId: string | null = null;
  
  // UI state flags
  isSubmitting = false;
  isSpecificInsuranceValid = false;
  
  // Data for specific insurance type (auto, fire, transport)
  specificInsurance: any;
  
  // Currently selected insurance category
  selectedCategory: any;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private policyService: PolicyService,
    private toastr : ToastrService
  ) {
    // Initialize guarantee form with validations
    this.guaranteeForm = this.fb.group({
      name: ['', Validators.required],
      assured_capital: ['', [Validators.required, Validators.min(0)]],
      rate: [0, Validators.max(100)],
      guarantee_type: ['percentage', [Validators.required]],
      value: [0],
    });
  
    // Initialize goods form with validations
    this.goodsForm = this.fb.group({
      name: ['', Validators.required],
      assured_capital: ['', [Validators.required, Validators.min(1)]],
    });

    // Initialize main policy form with validations
    this.policyForm = this.fb.group({
      client: ['', Validators.required],
      issue_date: ['', Validators.required],
      period: ['', Validators.required],
      beneficiaire: [''],
      category: ['', Validators.required],
      custom_days: [0],
      daily_rate: [1],
      assujeti_tva: [false],
      is_demo: [false],
      currency: ['BIF', Validators.required],
      assured_capital_bif: [0],
      assured_capital_devise: [0, Validators.required],
    });
  
    // Get the connected operator from the auth state
    this.connectedOperator$ = store.select(AuthState.connectedOperator);
  }
  
  ngOnInit(): void {
    // Subscribe to connected operator changes
    this.connectedOperator$.subscribe((connectedOperator: any) => {
      this.connectedOperator = connectedOperator;
      console.log('from operatorrr conneccttteedd', this.connectedOperator);
      
      // Redirect logic (currently commented out)
      if (!connectedOperator) {
        // this.router.navigateByUrl('/login')
      }
    });

    this.policyForm.valueChanges.subscribe(() => {

      const capitalAssured = this.policyForm.get('assured_capital_bif')?.value

      this.guaranteeForm.patchValue({
        assured_capital: capitalAssured
      })
    });
  }

  /**
   * Calculates the capital value in BIF based on exchange rate
   * Updates the form value and stored variable
   */
  updateCapitalInBif() {
    const value = this.policyForm.value.assured_capital_devise * this.policyForm.value.daily_rate;
    this.policyForm.patchValue(
      { assured_capital_bif: value },
    );
    this.capitalInBif = value;
  }
  
  /**
   * Handles client selection from lookup component
   * @param clientId Selected client data
   */
  onClientSelected(clientId: any) {
    this.selectedClientId = clientId.lookup_description;
    this.policyForm.patchValue({client: this.selectedClientId});
  }
  
  /**
   * Advances to the next step if current step validation passes
   */
  onNext() {
    if (this.step === 1 && this.selectedClientId && this.policyForm.valid) {
      this.step++;
    } else if (this.step === 2 && this.isSpecificInsuranceValid) {
      this.step++;
    } else if (this.step === 3 && this.selectedGoods) {
      this.step++;
    }
  }
  
  /**
   * Goes back to the previous step
   */
  onBack() {
    if (this.step > 1) this.step--;
  }

  /**
   * Tracks selected category changes from the form
   * Angular lifecycle hook for change detection
   */
  ngDoCheck() {
    this.selectedCategory = this.policyForm.value.category;
  }
  
/**
   * Crée une police et soumet les données associées.
   */
createPolicy() {
  this.isSubmitting = true;

  const data = { 
    operator: this.connectedOperator.id,
    company: this.connectedOperator.company.id,
    type: 'AAAA',
    ...this.policyForm.value
  };

  this.policyService.createPolicy(data).subscribe(
    (response: any) => {
      this.policyId = response.id;
      this.isSubmitting = false;
      this.toastr.success('La police a été créée avec succès !', 'Succès');
      
      // Soumettre les données associées
      this.submitGuarantees();
      this.submitGoods();
      this.createSpecificInsurance();

      console.log('Police créée:', response);
    },
    (error) => {
      this.isSubmitting = false;
      this.handleError(error);
    }
  );
}
  
  createSpecificInsurance() {
    if (!this.policyId) return;

    this.isSubmitting = true;
    
    const body = {
      policy: this.policyId,
      ...this.specificInsurance
    };

    this.policyService.createSpecificInsurance(body, this.selectedCategory).subscribe(
      (response: any) => {
        this.specificInsuranceId = response.id;
        this.isSubmitting = false;
        this.toastr.success('L’assurance' +response.category + ' a été créée avec succès !', 'Succès');
        console.log('Assurance spécifique créée:', response);
      },
      (error) => {
        this.isSubmitting = false;
        this.handleError(error);
      }
    );
  }
  
  /**
   * Adds a guarantee to the selected guarantees list
   * from the guarantee form data
   */
  addGuarantee() {
    if (this.guaranteeForm.valid) {
      const guarantee = {
        name: this.guaranteeForm.value.name,
        assured_capital: this.guaranteeForm.value.assured_capital,
        guarantee_type: this.guaranteeForm.value.guarantee_type,
        value: this.guaranteeForm.value.value,
        rate: this.guaranteeForm.value.rate,
      };
      
      this.selectedGuarantees.push(guarantee);
      
      // Reset form fields after adding
      this.guaranteeForm.patchValue({
        name: '',
        rate: 0,
        guarantee_type: '',
        value: 0,
      });
    }
  }
  
  /**
   * Adds an insured asset to the selected goods list
   * from the goods form data
   */
  addGoods() {
    if (this.goodsForm.valid) {
      const goods = {
        name: this.goodsForm.value.name,
        assured_capital: this.goodsForm.value.assured_capital,
      };
      
      this.selectedGoods.push(goods);
      
      // Reset form fields after adding
      this.goodsForm.patchValue({
        name: '',
        assured_capital: '',
      });
    }
  }
  
  /**
   * Removes a guarantee from the selected list by index
   * @param index Array index to remove
   */
  removeGuarantee(index: number) {
    this.selectedGuarantees.splice(index, 1);
  }
  
  /**
   * Removes an insured asset from the selected list by index
   * @param index Array index to remove
   */
  removeGoods(index: number) {
    this.selectedGoods.splice(index, 1);
  }
  
  /**
   * Soumet toutes les garanties sélectionnées à l'API
   * et les associe à la police créée.
   */
  submitGuarantees() {
    this.isSubmitting = true;

    const guaranteesWithInsurance = this.selectedGuarantees.map(guarantee => ({
      ...guarantee,
      policy: this.policyId
    }));

    const promises = guaranteesWithInsurance.map(guarantee =>
      this.policyService.createGuarantee(guarantee).toPromise()
    );

    Promise.all(promises)
      .then(responses => {
        this.isSubmitting = false;
        this.toastr.success('Toutes les garanties ont été soumises avec succès !', 'Succès');
        
        if (this.policyForm.value.is_demo) {
          this.router.navigateByUrl('/policy/offer');
        } else {
          this.router.navigateByUrl('/policy/list');
        }
        
        console.log('Garanties soumises:', responses);
      })
      .catch(error => {
        this.isSubmitting = false;
        this.handleError(error);
      });
  }
  
/**
   * Soumet tous les biens assurés sélectionnés à l'API
   * et les associe à la police créée.
   */
submitGoods() {
  this.isSubmitting = true;

  const goodsWithInsurance = this.selectedGoods.map(goods => ({
    ...goods,
    policy: this.policyId
  }));

  const promises = goodsWithInsurance.map(goods =>
    this.policyService.createGoods(goods).toPromise()
  );

  Promise.all(promises)
    .then(responses => {
      this.isSubmitting = false;
      this.toastr.success('Tous les biens assurés ont été soumis avec succès !', 'Succès');
      console.log('Biens soumis:', responses);
    })
    .catch(error => {
      this.isSubmitting = false;
      this.handleError(error);
    });
}

  
  /**
   * Main form submission handler
   * Determines which entity needs to be created next
   */
  onSubmit() {
    if (!this.policyId) {
      this.createPolicy();
    } else if (!this.specificInsuranceId) {
      this.createSpecificInsurance();
    } else {
      this.submitGuarantees();
    }
  }

  /**
   * Debug method to check form state
   */
  checkItNow() {
    console.log(this.policyForm.valid, this.policyForm.value);
  }

  /**
   * Handles form data changes from child components
   * @param formData Form data from specific insurance type components
   */
  onFormChange(formData: any) {
    console.log('Form Data:', formData);
    this.specificInsurance = formData;
  }
  
  /**
   * Handles form validity changes from child components
   * @param isValid Boolean indicating if the specific form is valid
   */
  onFormValidityChange(isValid: boolean) {
    console.log('Form Valid:', isValid);
    this.isSpecificInsuranceValid = isValid;
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