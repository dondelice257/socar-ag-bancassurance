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
  templateUrl: './policies-list.component.html',
  styleUrl: './policies-list.component.scss'
})
export class PoliciesListComponent {
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
    { columnDef: 'agency.name', header: 'Agence' },



    { columnDef: 'formatted_avenant', header: 'Avenant' },
    { columnDef: 'bill.status', header: 'Status' },
    { columnDef: 'premium_amount', header: 'Prime totale' },


    { columnDef: 'tva', header: 'TVA' },
    { columnDef: 'bill.bill_code', header: 'Facture' },

    { columnDef: 'issue_date', header: 'Date effet' },
    { columnDef: 'expiration_date', header: 'Date echeance' },

  ];
  
  tableData:any


  constructor(
    private policyService : PolicyService
  ){

  }


  ngOnInit(){
  }




}
