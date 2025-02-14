import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PolicyService } from '../../../core/services/policy.service';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
@Component({
  selector: 'app-policy-details',
  standalone: true,
  imports: [
    CommonModule,
    NgxPrintModule
  ],
  templateUrl: './policy-details.component.html',
  styleUrl: './policy-details.component.scss'
})
export class PolicyDetailsComponent {

policyId:string ='';
policy:any
isModalShown:boolean=false
totalPrimeBase = 0
@ViewChild('myModal') myModal: ElementRef | any;


  constructor(
    private route : ActivatedRoute,
    private policyService : PolicyService,
  ){

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
    this.totalPrimeBase = this.policy.fire_insurance.guarantees.reduce((sum:any, guarantee:any) => {
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



}
