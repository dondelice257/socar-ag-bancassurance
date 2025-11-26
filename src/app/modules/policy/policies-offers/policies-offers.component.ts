import { Component } from '@angular/core';
import { PolicyService } from '../../../core/services/policy.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policies-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],
  templateUrl: './policies-offers.component.html',
  styleUrl: './policies-offers.component.scss'
})
export class PoliciesOffersComponent {
  tableColumns = [
    { 
      columnDef: 'policy_number', 
      header: 'Code police',
      detail: {
        link: '/policy/details/',
        field: 'id',
      }, 
    },
    { columnDef: 'category', header: 'Categorie' },

    { columnDef: 'client.user_full_name', header: 'Client' },
    { columnDef: 'operator.full_name', header: 'Operateur' },



    { columnDef: 'type_avenant', header: 'Type' },
    // { columnDef: 'status', header: 'Status' },
    { columnDef: 'premium_amount', header: 'Prime totale' },


    { columnDef: 'tva', header: 'TVA' },

    { columnDef: 'issue_date', header: 'Date effet', type: 'date' },
    { columnDef: 'expiration_date', header: 'Date echeance', type: 'date' },
    

  ];
  
  tableData:any


  constructor(
    private policyService : PolicyService
  ){

  }


  ngOnInit(){
  }




}
