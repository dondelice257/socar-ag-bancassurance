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



if(title=='Garantie'){
this.selectedBodyUpdate = body.guarantee_type=='fixed'?{'name':body.name, 'value':body.value, 'assured_capital':body.assured_capital}:{'name':body.name, 'rate':body.rate, 'assured_capital':body.assured_capital}

}else if(title=='Client'){
  console.log(body)
this.selectedBodyUpdate = {'first_name':body.first_name, 'phone_number':body.phone_number, 'country':body.country, 'zone':body.zone, 'quartier':body.quartier, 'city':body.city, 'commune':body.commune}
}else if(title=='Automobile'){
  console.log('tttt', title)
  this.selectedBodyUpdate = {'plaque':body.plaque, 'chasis':body.chasis, 'usage':body.usage, 'limites_territoriales':body.limites_territoriales, 'marque':body.marque, 'model':body.model, 'annee_fabrication':body.annee_fabrication, 'puissance_moteur':body.puissance_moteur, 'places_cabine':body.places_cabine, 'places_plateau':body.places_plateau, 'numero_vignette':body.numero_vignette}
}else if(title=='Incendie'){
  this.selectedBodyUpdate = {'nature_risque':body.nature_risque, 'quartier':body.quartier, 'province':body.province, 'cadastre':body.cadastre, 'titre':body.titre}
}else if(title=='Transport'){
  this.selectedBodyUpdate = {'nature_marchandise':body.nature_marchandise, 'description':body.description, 'nature_emballage':body.nature_emballage, 'depart':body.depart, 'arrivee':body.arrivee, 'quantity':body.quantity, 'colis_number': body.colis_number, 'reference':body.reference, 'packaging': body.packaging, 'transport_type': body.transport_type, 'descriptif_marchandise': body.descriptif_marchandise}
}else if(title=='Echeance'){
  console.log('eeeeeeee', body)
this.selectedBodyUpdate = {'period':body.period, 'issue_date':body.issue_date}
}else if(title=='Membre'){
  console.log('eeeeeeee', body)
this.selectedBodyUpdate = {'age':body.age, 'full_name':	body.full_name, "number_of_installments":body.number_of_installments, "credit_amount":body.credit_amount, "credit_rate":body.credit_rate, "addresse": body.addresse, "birth_year":body.birth_year, "phone_number":body.phone_number, "id_number":body.id_number, "employer":body.employer, "next_birth":body.next_birth, "email":body.email, "account_number":body.account_number}

}else if(title=='Info contrat'){
    this.selectedBodyUpdate = {'assured_capital_bif':body.assured_capital_bif}

  if(this.policy.category=='transport'){
    this.selectedBodyUpdate = {'assured_capital_bif':body.assured_capital_bif, 'assured_capital_devise':body.assured_capital_devise, 'daily_rate':body.daily_rate, 'currency':body.currency}

  }else{
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


  }



