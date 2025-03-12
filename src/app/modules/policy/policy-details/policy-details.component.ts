import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PolicyService } from '../../../core/services/policy.service';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { FireContractComponent } from '../documents-printing/fire-contract/fire-contract.component';
import { TransportContractComponent } from '../documents-printing/transport-contract/transport-contract.component';
import { AutoContractComponent } from '../documents-printing/auto-contract/auto-contract.component';
import { AutoCardComponent } from '../documents-printing/auto-card/auto-card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BillPrintComponent } from '../documents-printing/bill-print/bill-print.component';

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
    BillPrintComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './policy-details.component.html',
  styleUrl: './policy-details.component.scss'
})
export class PolicyDetailsComponent {

policyId:string ='';
selectedAction:string ='';

policy:any
isModalShown:boolean=false
isLoading:boolean=false

totalPrimeBase = 0
documentToPrint ='contrat'

actions:{action:string, description:string, label:string, is_danger:boolean, icon:string}[]=[]

renewForm:FormGroup
@ViewChild('myModal') myModal: ElementRef | any;


  constructor(
    private route : ActivatedRoute,
    private policyService : PolicyService,
    private router : Router,
    private fb: FormBuilder,
  ){
    // Initialize main policy form with validations
    this.renewForm = this.fb.group({
      issue_date: ['', Validators.required],
      period_id: ['', Validators.required],
      assured_capital_bif: [0, Validators.required],
    });
  }


  ngOnInit(){
    this.route.params.subscribe((policyId:any) => {

      if(policyId){
          // console.log('cccppp', campaignId)
      this.policyId=policyId['policyId']

      this.getPolicyDetails()

      }
  
    })
  }


  getPolicyDetails(){
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
  



}
