import { Component } from '@angular/core';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';

@Component({
  selector: 'app-expired-policies',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './expired-policies.component.html',
  styleUrl: './expired-policies.component.scss'
})
export class ExpiredPoliciesComponent {

    tableColumns = [
    { 
      columnDef: 'policy_number', 
      header: 'Code police',
      detail: {
        link: '/policy/details/',
        field: 'id',
      }, 
    },
    { columnDef: 'formatted_avenant', header: 'Avenant' },

    { columnDef: 'client.full_name', header: 'Client' },
    { columnDef: 'client.user_phone_number', header: 'Tel' },
    { columnDef: 'operator.full_name', header: 'Operateur' },




    // { columnDef: 'status', header: 'Status' },
    { columnDef: 'premium_amount', header: 'Prime totale' },



    { columnDef: 'issue_date', header: 'Date effet', type: 'date' },
    { columnDef: 'expiration_date', header: 'Date echeance', type: 'date' },
    

  ];

}
