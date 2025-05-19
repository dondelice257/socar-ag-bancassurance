import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreditFormComponent } from '../../production/credit-form/credit-form.component';
import * as XLSX from 'xlsx';

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
    CreditFormComponent,
    MatCardModule, 
    MatCheckboxModule, 
    FormsModule, 
    MatProgressSpinnerModule

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
  memberForm: FormGroup;
  // Converted capital amount in BIF currency
  capitalInBif = 0;
  
  // Observable for the currently logged-in operator
  connectedOperator$!: Observable<any>;
  connectedOperator: any;
  
  // Selected data storage
  selectedClientId: string | null = null;
  selectedGuarantees: any[] = [];
  selectedMembers: any[] = [];

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


  currencies = [
    { code: 'BIF', name: '(BIF) Burundian Franc ' },
    { code: 'USD', name: '(USD) US Dollar ' },
    { code: 'EUR', name: '(EUR) Euro ' },
    { code: 'KES', name: '(KES) Kenyan Shilling ' },
    { code: 'UGX', name: '(UGX) Ugandan Shilling ' },
    { code: 'RWF', name: '(RWF) Rwandan Franc ' },
    { code: 'GBP', name: '(GBP) British Pound ' },
    { code: 'JPY', name: '(JPY) Japanese Yen ' },
    { code: 'CAD', name: '(CAD) Canadian Dollar ' },
    { code: 'AUD', name: '(AUD) Australian Dollar ' },
    { code: 'CHF', name: '(CHF) Swiss Franc ' },
    { code: 'INR', name: '(INR) Indian Rupee ' },
    { code: 'CNY', name: '(CNY) Chinese Yuan ' },
    { code: 'MXN', name: '(MXN) Mexican Peso ' },
    { code: 'BRL', name: '(BRL) Brazilian Real ' },
    { code: 'ZAR', name: '(ZAR) South African Rand ' },
    { code: 'RUB', name: '(RUB) Russian Ruble ' },
    { code: 'SGD', name: '(SGD) Singapore Dollar ' },
    { code: 'HKD', name: '(HKD) Hong Kong Dollar ' },
    { code: 'KRW', name: '(KRW) South Korean Won ' },
    { code: 'SEK', name: '(SEK) Swedish Krona ' }
  ];


  autoOptions = ['RESPONSABILITE CIVILE', 'DEGATS MATERIELS', 'INCENDIE', 'VOL', 'BRIS DE VITRE', 'INDIVIDUEL OCCUPANT', 'PASSAGERS SUR PLATEAU', 'EXTENSION COMESA'];
  fireOptions = ['INCENDIE FOUDRE EXPLOSION CHUTE D\'AERONERFS ET HEURTES DE VEHICULES', 'TEMPETE OURAGAN ET TROMBE', 'TREMBLEMENT DE TERRE ET ERRUPTION VOLCANIQUE', 'DE ( DEGATS DES EAUX )', 'INONDATION', 'RE ( RISQUES ELECTRIQUES)', 'FAP SAUF', 'BG ( BRIS DE GLACE )', 'VOL', 'FRAIS DE POMPIERS', 'FRAIS DE DEBLAIS', 'CHOMAGES IMMOBILIERS', 'PERTES D EXPLOITATION', 'RECOURS DES VOISINS'];
  transportOptions = ['Tous risques', 'Accident caracterise', 'FAP SAUF'];



  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  
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

      this.memberForm = this.fb.group({
      full_name: ['', Validators.required],
      age: ['', Validators.required],
      addresse: [''],
      id_number: [''],
      phone_number: [''],
      employer: [''],
      email: [''],
      account_number: [''],


      credit_amount: [0, [Validators.required, Validators.min(0)]],
      ongoing_amount: [0],

      credit_rate: [0, Validators.max(100)],
      ongoing_rate: [0, Validators.max(100)],

      number_of_installments: [0, Validators.required],

    });
  
    // Initialize goods form with validations
    this.goodsForm = this.fb.group({
      name: ['', Validators.required],
      assured_capital: ['', [Validators.required, Validators.min(1)]],
    });

    // Initialize main policy form with validations
    this.policyForm = this.fb.group({
      client: [''],
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

      // console.log(this.policyForm.value)

      if(this.selectedCategory =='credit'){
        this.policyForm.get('client')?.clearValidators()
      }

      this.guaranteeForm.patchValue({
        assured_capital: capitalAssured
      })

    this.selectedCategory = this.policyForm.value.category;

    });
  }

  /**
   * Calculates the capital value in BIF based on exchange rate
   * Updates the form value and stored variable
   */
  updateCapitalInBif() {
    const value = this.policyForm.value.assured_capital_devise * this.policyForm.value.daily_rate;
    const roundedValue = Math.round(value); // Arrondi à l'entier le plus proche
  
    this.policyForm.patchValue({ assured_capital_bif: roundedValue });
    this.capitalInBif = roundedValue;
  }
  
  
  /**
   * Handles client selection from lookup component
   * @param clientId Selected client data
   */
  onClientSelected(clientId: any) {
    this.selectedClientId = clientId.lookup_field3;
    this.policyForm.patchValue({client: this.selectedClientId});
  }
  
  /**
   * Advances to the next step if current step validation passes
   */
  onNext() {
    if (this.step === 1 && this.policyForm.valid) {
      this.step++;
    } else if (this.step === 2 && this.isSpecificInsuranceValid) {
      if(this.selectedCategory=="fire"){
        this.step++;

      }else{
        this.step=4;

      }
    } else if (this.step === 3 && this.selectedGoods) {
      this.step++;
    }
  }
  
  /**
   * Goes back to the previous step
   */
  onBack() {
    if (this.step > 1){
      if(this.step == 4){
        if(this.selectedCategory=="fire"){
          this.step--;
  
        }else{
          this.step=2;
  
        }
      }else{
        this.step--;

      }

    } 
  }

  /**
   * Tracks selected category changes from the form
   * Angular lifecycle hook for change detection
   */
/**
   * Crée une police et soumet les données associées.
   */
createPolicy() {
  this.isSubmitting = true;

  if(this.policyForm.get('period')?.value==='Custom'){
    this.policyForm.patchValue({period:''})
  }

  const data = { 
    operator: this.connectedOperator.id,
    agency: this.connectedOperator.agency.id,

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

      this.createSpecificInsurance();


      this.submitGoods();

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
        if(this.connectedOperator.company?.is_non_vie){
          this.submitGuarantees();
  
        }else{
          this.submitMembers()
        }
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
    }else{
      console.log(this.guaranteeForm.value, this.guaranteeForm.status)
    }
  }
  




  addMember() {
    if (this.memberForm.valid) {
      const member = {
        full_name: this.memberForm.value.full_name,
        age: this.memberForm.value.age,
        addresse: this.memberForm.value.addresse,
        phone_number: this.memberForm.value.phone_number,
        id_number: this.memberForm.value.id_number,
        employer: this.memberForm.value.employer,
        email: this.memberForm.value.email,
        account_number: this.memberForm.value.account_number,


        credit_amount: this.memberForm.value.credit_amount,
        credit_rate: this.memberForm.value.credit_rate,
        ongoing_amount: this.memberForm.value.ongoing_amount,
        ongoing_rate: this.memberForm.value.ongoing_rate,
        number_of_installments: this.memberForm.value.number_of_installments,

      };
      
      this.selectedMembers.push(member);
      
      // Reset form fields after adding
      this.memberForm.patchValue({
        full_name: '',
        age: '',
        addresse: '',
        phone_number: '',
        id_number: '',
        employer: '',
        email: '',
        account_number: '',
        credit_amount: 0,
        credit_rate: 0,
        ongoing_amount: 0,
        ongoing_rate: 0,
        number_of_installments: 0,

      });
    }else{
      console.log(this.memberForm.value, this.memberForm.status)
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


    removeMember(index: number) {
    this.selectedMembers.splice(index, 1);
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
          this.policyService.sendHqNotification({policy_id:this.policyId}).subscribe(()=>{
            this.toastr.success('Notification envoyée au siege avec succès', 'Succès');
          })
        }
        
        console.log('Garanties soumises:', responses);
      })
      .catch(error => {
        this.isSubmitting = false;
        this.handleError(error);
      });
  }
  



  submitMembers() {
    this.isSubmitting = true;

    const membersWithInsurance = this.selectedMembers.map(member => ({
      ...member,
      credit_protection_insurance: this.specificInsuranceId
    }));

    const promises = membersWithInsurance.map(member =>
      this.policyService.createMember(member).toPromise()
    );

    Promise.all(promises)
      .then(responses => {
        this.isSubmitting = false;
        this.toastr.success('Toutes les membres ont été soumises avec succès !', 'Succès');

      
        if (this.policyForm.value.is_demo) {
          this.router.navigateByUrl('/policy/offer');
        } else {
          this.router.navigateByUrl('/policy/list');
          this.policyService.sendHqNotification({policy_id:this.policyId}).subscribe(()=>{
            this.toastr.success('Notification envoyée au siege avec succès', 'Succès');
          })
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

  const goodsWithInsurance = this.selectedGoods.map((goods:any) => ({
    ...goods,
    policy: this.policyId
  }));

  const promises = goodsWithInsurance.map((goods:any) =>
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

      if(this.connectedOperator.company?.is_non_vie){
        this.submitGuarantees();

      }else{
        this.submitMembers()
      }
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
    // console.log('Form Data:', formData);
    this.specificInsurance = formData;
  }
  
  /**
   * Handles form validity changes from child components
   * @param isValid Boolean indicating if the specific form is valid
   */
  onFormValidityChange(isValid: boolean) {
    // console.log('Form Valid:', isValid);
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


  removeAllMembers() {
    this.selectedMembers.length = 0;
  
    // Reset the file input
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  
  

  onExcelImport(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      console.error('Cannot use multiple files');

      return;
    }
  
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
      // Assuming first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
      // Convert to JSON
      const data = <any[]>(XLSX.utils.sheet_to_json(ws, { defval: '' }));
  
      // Expected fields in the Excel file:
      // full_name, age, addresse, phone_number, id_number, employer, email, account_number, credit_amount, credit_rate, ongoing_amount, ongoing_rate, number_of_installments
  
      for (const row of data) {
        const member = {
          full_name: row.full_name || '',
          age: row.age || '',
          addresse: row.addresse || '',
          phone_number: row.phone_number || '',
          id_number: row.id_number || '',
          employer: row.employer || '',
          email: row.email || '',
          account_number: row.account_number || '',
          credit_amount: Number(row.credit_amount) || 0,
          credit_rate: Number(row.insurance_rate) || 0,
          ongoing_amount: Number(row.outstanding_amount) || 0,
          ongoing_rate: Number(row.outstanding_rate) || 0,
          number_of_installments: Number(row.number_of_installments) || 0
        };
        this.selectedMembers.push(member);
      }
    };
  
    reader.readAsBinaryString(target.files[0]);
  }
  
  
}