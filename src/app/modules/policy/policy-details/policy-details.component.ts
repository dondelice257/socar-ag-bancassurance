import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PolicyService } from '../../../core/services/policy.service';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { FireContractComponent } from '../documents-printing/fire-contract/fire-contract.component';
import { TransportContractComponent } from '../documents-printing/transport-contract/transport-contract.component';
import { AutoContractComponent } from '../documents-printing/auto-contract/auto-contract.component';
import { CreditContratComponent } from '../documents-printing/credit-contrat/credit-contrat.component';

import { AutoCardComponent } from '../documents-printing/auto-card/auto-card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BillPrintComponent } from '../documents-printing/bill-print/bill-print.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../shared/states/auth/auth.state';
import { CreditConditionComponent } from '../documents-printing/credit-condition/credit-condition.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from '../../../shared/components/reusable/update/update.component';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'app-policy-details',
  standalone: true,
  imports: [
    CommonModule,
    NgxPrintModule,
    FireContractComponent,
    TransportContractComponent,
    AutoContractComponent,
    AutoCardComponent,
    ReactiveFormsModule,
    FormsModule,
    BillPrintComponent,
    MatProgressSpinnerModule,
    CreditContratComponent,
    CreditConditionComponent,
    MatCheckboxModule,
    UpdateComponent
  ],
  templateUrl: './policy-details.component.html',
  styleUrl: './policy-details.component.scss'
})
export class PolicyDetailsComponent {

policyId:string ='';
selectedAction:string ='';


// Observable for the currently logged-in operator
connectedOperator$!: Observable<any>;
connectedOperator: any;
policy:any
isModalShown:boolean=false
isLoading:boolean=false
hasHeader : boolean = false
addingGuarantee = false

totalPrimeBase = 0
documentToPrint ='contrat'
selectedIdUpdate=''
selectedUrlUpdate = ''
selectedBodyUpdate ={}
selectedTitleUpdate=''
actions:{action:string, description:string, label:string, is_danger:boolean, icon:string}[]=[]

renewForm:FormGroup
guaranteeForm:FormGroup
goodsForm:FormGroup

  marques: string[] = [
    'TOYOTA', 'VOLKSWAGEN', 'BMW', 'MERCEDES-BENZ', 'FORD', 
    'HONDA', 'CHEVROLET', 'NISSAN', 'HYUNDAI', 'AUDI', 
    'KIA', 'PEUGEOT', 'RENAULT', 'FIAT', 'JEEP', 'LAND ROVER', 
    'TESLA', 'SUBARU', 'MAZDA', 'MITSUBISHI', 'PORSCHE', 
    'JAGUAR', 'LEXUS', 'ACURA', 'INFINITI', 'MINI', 'DODGE', 
     'CHRYSLER', 'CITROËN', 'SAAB', 'ALFA ROMEO', 
    'SUZUKI', 'HONDA', 'MERCEDES', 'VOLVO', 'HOWO', 'MACHINE', 'DAIHATSU'
  ];

  classes:string[]= [
    'Vehicule (4pass.)','Vehicule (+4pass.)','Voiture taxi (4 pass.)','Voiture taxi (6-8 pass.)','Minibus 10 passagers','Minibus 14 passagers', 'Minibus(<=11 pass)','Jeep (4 pass.)','Jeep(+4 pass)','Camionnette(-4t)','Camionnette(+=4t)','Camionnette (d.cab)','Bus(45 pass)','Bus(15 pass)','Bus(18 pass)','Bus(25 pass)','Bus(30 pass)','Bus(35 pass)','Bus(42 pass)','Bus(46-60 pass)','Bus(80 pass)','Bus(100 pass)','Camion','Camion remorque','Semi-remorque','Remorque','Tous veh. (4pass.)','Tous veh. (8 pass)','Tous veh.(+11 pass.)', 'Tous veh.', 'Non design', 'Veh. prioritaires', 'Engins speciaux', 'Vehicules de sport', 'Moto (2 Roues)', 'Tricycle (3 roues)', 'Taxi Moto'
  ]

  usages:string[]= [
    'Promenades et affaires','Auto-ecole','Transport pour compte propre','Transport de carburants','Transport gratuit','Transport de marchandises','Transport remunere de persones','Location-affaires et promenade','Location-transport gratuit de personnes','Location-transport remunere de personnes','Location-transport de choses', 'Location-transport de carburant','Garagiste (veh propre)','Garagiste (en depot)','Usage specifique','Competition sportive','Acheminement',
  ]


  autoOptions = [
  'RESPONSABILITE CIVILE',
  'DEGATS MATERIELS',
  'INCENDIE',
  'VOL',
  'BRIS DE VITRE',
  'INDIVIDUEL OCCUPANT',
  'PASSAGERS SUR PLATEAU',
  'EXTENSION COMESA'
];

fireOptions = [
  "INCENDIE FOUDRE EXPLOSION CHUTE D'AERONERFS ET HEURTES DE VEHICULES",
  'TEMPETE OURAGAN ET TROMBE',
  'TREMBLEMENT DE TERRE ET ERRUPTION VOLCANIQUE',
  'DE ( DEGATS DES EAUX )',
  'INONDATION',
  'RE ( RISQUES ELECTRIQUES)',
  'FAP SAUF',
  'BG ( BRIS DE GLACE )',
  'VOL',
  'FRAIS DE POMPIERS',
  'FRAIS DE DEBLAIS',
  'CHOMAGES IMMOBILIERS',
  'PERTES D EXPLOITATION',
  'RECOURS DES VOISINS'
];

transportOptions = [
  'Tous risques',
  'Accident caracterise',
  'FAP SAUF'
];


@ViewChild('myModal') myModal: ElementRef | any;
@ViewChild('updateModalBtn') updateModalBtn!: ElementRef;
  selectedUrlDelete!: string;
  selectedTitleDelete!: string;
  selectedIdDelete!: string;
  addingGoods: boolean = false;



  constructor(
    private route : ActivatedRoute,
    private policyService : PolicyService,
    private router : Router,
    private fb: FormBuilder,
    private store : Store,
    private toastr : ToastrService,
    private generalService : GeneralService
  ){
    // Initialize main policy form with validations
    this.renewForm = this.fb.group({
      issue_date: ['', Validators.required],
      period_id: ['', Validators.required],
      assured_capital_bif: [0, Validators.required],
    });

    this.guaranteeForm = this.fb.group({
      name: ['', Validators.required],
      assured_capital: [0, [Validators.required, Validators.min(0)]],
      rate: [0, Validators.max(100)],
      guarantee_type: ['percentage', [Validators.required]],
      value: [0],
    });


        this.goodsForm = this.fb.group({
      name: ['', Validators.required],
      assured_capital: [0, [Validators.required, Validators.min(0)]],
    });

    this.connectedOperator$ = this.store.select(AuthState.connectedOperator);

  }


  ngOnInit(){
    this.route.params.subscribe((policyId:any) => {

      if(policyId){
          // console.log('cccppp', campaignId)
      this.policyId=policyId['policyId']

      this.getPolicyDetails()

      }
  
    })

    this.connectedOperator$.subscribe((connectedOperator: any) => {
      this.connectedOperator = connectedOperator;
      console.log('from operatorrr conneccttteedd', this.connectedOperator);


      
      // Redirect logic (currently commented out)
      if (!connectedOperator) {
        this.router.navigateByUrl('/login')
      }
    });
  }


  getPolicyDetails(){
    this.policy=undefined
    this.policyService.getPolicyDetails(this.policyId).subscribe((data:any)=>{
      console.log('policy details', data)

      this.policy = data


      this.calculateTotalPrimeBase();
    })
  }

  calculateTotalPrimeBase(): void {
    this.totalPrimeBase = this.policy.guarantees.reduce((sum:any, guarantee:any) => {
      return sum + guarantee.prime;
    }, 0);
  }



  printModalContent() {
    const modalContent = this.myModal.nativeElement.innerHTML;
    const printWindow :any= window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(modalContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }



  closeModal(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.inner-container')) {
        this.isModalShown = false;
    }

  }


  selectAction(action:string){
    this.selectedAction = action
  }


  doPolicyAction(): void {
    if (!this.selectedAction) {
      console.error('No action selected');
      return;
    }
  
    this.isLoading = true;
  
    let body = {};
  
    if (this.selectedAction === 'renew' && this.renewForm.valid) {
      body ={previous_policy_id:this.policyId, ...this.renewForm.value} ;
    } else if (this.selectedAction === 'renew' && !this.renewForm.valid) {
      console.error('Renew form is invalid');
      this.isLoading = false;
      return;
    }
  
    this.policyService.doPolicyAction(this.policyId, this.selectedAction, body)
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          console.log('Policy action successful:', data, this.selectedAction);
          this.router.navigateByUrl('/policy/list');

          if(this.selectedAction=='proceed'){
            console.log("this is proceeeddd actionnnn")
            // this.policyService.sendHqNotification({policy_id:this.policyId}).subscribe(()=>{
            // // this.toastr.success('Notification envoyée au siege avec succès', 'Succès');
            // })


          }
          this.getPolicyDetails()

        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Policy action failed:', error);
          // Optionally, display an error message to the user
        }
      });
  }
  


  chooseObjectUpdate(url:string, id:string, title:string, body:any){
this.selectedUrlUpdate = url
this.selectedIdUpdate = id
this.selectedTitleUpdate = title



if (title === 'Garantie') {

  const isFixed = body.guarantee_type === 'fixed';

  this.selectedBodyUpdate = {
    name: {
      value: body.name,
      type: 'select',
      options: this.getGuaranteeOptions(this.policy.category)
    },

    assured_capital: {
      value: body.assured_capital,
      type: 'number'
    },

    ...(isFixed
      ? {
          value: {
            value: body.value,
            type: 'number'
          }
        }
      : {
          rate: {
            value: body.rate,
            type: 'number'
          }
        }
    )
  };
}else if(title=='Client'){
  console.log(body)
this.selectedBodyUpdate = {'first_name':body.first_name, 'phone_number':body.phone_number, 'country':body.country, 'zone':body.zone, 'quartier':body.quartier, 'city':body.city, 'commune':body.commune}
}else if(title=='Automobile'){
  console.log('tttt', title)
  this.selectedBodyUpdate = {
  plaque: { value: body.plaque, type: 'text' },
  chasis: { value: body.chasis, type: 'text' },

  usage: {
    value: body.usage,
    type: 'select',
    options: this.usages
  },

  classe: {
    value: body.classe,
    type: 'select',
    options: this.classes
  },

  marque: {
    value: body.marque,
    type: 'select',
    options: this.marques
  },

  model: { value: body.model, type: 'text' },
  annee_fabrication: { value: body.annee_fabrication, type: 'number' },
  puissance_moteur: { value: body.puissance_moteur, type: 'number' },
  places_cabine: { value: body.places_cabine, type: 'number' },
  places_plateau: { value: body.places_plateau, type: 'number' },
};
}else if(title=='Incendie'){
  this.selectedBodyUpdate = {'nature_risque':body.nature_risque, 'quartier':body.quartier, 'province':body.province, 'cadastre':body.cadastre, 'titre':body.titre}
}else if(title=='Transport'){
  this.selectedBodyUpdate = {'nature_marchandise':body.nature_marchandise, 'description':body.description, 'nature_emballage':body.nature_emballage, 'depart':body.depart, 'arrivee':body.arrivee, 'quantity':body.quantity, 'colis_number': body.colis_number, 'reference':body.reference, 'packaging': body.packaging, 'transport_type': body.transport_type, 'descriptif_marchandise': body.descriptif_marchandise}
}else if(title=='Echeance'){
  console.log('eeeeeeee', body)
this.selectedBodyUpdate = {
    period: {
    value: body.period,
    type: 'select',
    options: [3,6,12]
  },
      issue_date: {
    value: body.issue_date,
    type: 'date',
  }
}


}else if(title=='Membre'){
  console.log('eeeeeeee', body)
this.selectedBodyUpdate = {'age':body.age, 'full_name':	body.full_name, "number_of_installments":body.number_of_installments, "credit_amount":body.credit_amount, "credit_rate":body.credit_rate, "addresse": body.addresse, "birth_year":body.birth_year, "phone_number":body.phone_number, "id_number":body.id_number, "employer":body.employer, "next_birth":body.next_birth, "email":body.email, "account_number":body.account_number}

}else if(title=='Info contrat'){
    this.selectedBodyUpdate = {'assured_capital_bif':body.assured_capital_bif}

  if(this.policy.category=='transport'){
    this.selectedBodyUpdate = {'assured_capital_bif':body.assured_capital_bif, 'assured_capital_devise':body.assured_capital_devise, 'daily_rate':body.daily_rate, 'currency':body.currency}

  }else if(this.policy.category=='fire'){
    this.selectedBodyUpdate = {'assured_capital_bif':body.assured_capital_bif, 'beneficiaire':body.beneficiaire}

  }
  else{
    this.selectedBodyUpdate = {'assured_capital_bif':body.assured_capital_bif}

  }
}else if(title=='Bien'){
  this.selectedBodyUpdate = {'name':body.name, 'assured_capital':body.assured_capital}
}

}

  chooseObjectDelete(url:string, id:string, title:string, body:any){
this.selectedUrlDelete = url
this.selectedIdDelete = id
this.selectedTitleDelete = title



if(title=='Garantie'){

}

}








getOutputFromUpdateComponent($event:any){
console.log($event)

if($event){
      this.toastr.success('Mis a jour avec success !', 'Succès');
      this.getPolicyDetails()

          this.updateModalBtn.nativeElement.click();
      

}
}



deleteObject(){
    this.isLoading = true;

    const req$ = this.generalService.Delete(this.selectedUrlDelete, this.selectedIdDelete)
    req$.subscribe({
      next: (res) => {
        this.isLoading = false;
              this.toastr.success('Supprimee avec success !');
              this.getPolicyDetails()

      },
      error: (err) => {
        this.isLoading = false;
      }
    });

}



  addGuarantee() {
    console.log("gggggggggg", this.guaranteeForm.value)
    if (this.guaranteeForm.valid) {
      const guarantee = {
        name: this.guaranteeForm.value.name,
        assured_capital: this.guaranteeForm.value.assured_capital,
        guarantee_type: this.guaranteeForm.value.guarantee_type,
        value: this.guaranteeForm.value.value,
        rate: this.guaranteeForm.value.rate,
        policy:this.policyId
      };
      
    this.policyService.createGuarantee(guarantee).subscribe((response)=>{
      this.toastr.success('Garantie ajoutee avec success !');
      this.getPolicyDetails()
                          // Reset form fields after adding
      this.addingGuarantee=false
      this.guaranteeForm.patchValue({
        name: '',
        rate: 0,
        guarantee_type: '',
        assured_capital_bif:0,
        value: 0,
      });

    })      

    }else{
      console.log(this.guaranteeForm.value, this.guaranteeForm.status)
    }
  }

    addGoods() {
    console.log("gggggggggg", this.goodsForm.value)
    if (this.goodsForm.valid) {
      const guarantee = {
        name: this.goodsForm.value.name,
        assured_capital: this.goodsForm.value.assured_capital,
      };
      
    this.policyService.createGoods(guarantee).subscribe((response)=>{
      this.toastr.success('Bien ajoutee avec success !');
      this.getPolicyDetails()
                          // Reset form fields after adding
      this.addingGoods=false
      this.goodsForm.patchValue({
        name: '',
        assured_capital_bif:0,
      });

    })      

    }else{
      console.log(this.guaranteeForm.value, this.guaranteeForm.status)
    }
  }


  getGuaranteeOptions(category: string): string[] {
  switch (category) {
    case 'auto':
      return this.autoOptions;

    case 'fire':
      return this.fireOptions;

    case 'transport':
      return this.transportOptions;

    default:
      return [];
  }
}


  }



