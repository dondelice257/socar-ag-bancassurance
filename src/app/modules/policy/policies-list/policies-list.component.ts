import { Component } from '@angular/core';
import { PolicyService } from '../../../core/services/policy.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../shared/states/auth/auth.state';
import { Router } from '@angular/router';

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

    // Observable for the currently logged-in operator
    connectedOperator$!: Observable<any>;
    connectedOperator: any;
  tableColumns :any[]= [];
  
  tableData:any
  actions:any


  constructor(
    private policyService : PolicyService,
    private store : Store,
    private router : Router
  ){
    this.connectedOperator$ = this.store.select(AuthState.connectedOperator);

  }


  ngOnInit(){

    this.actions = [
      {
          label: 'Enregistrer',
          tooltip: 'Enregistrer dans le syteme',
          action_type: 'save',
          successMessage: 'Police enregistrée dans le systeme avec succès',
          errorMessage: 'Une erreur est survenue lors de l\'enregistrement'
      }
  ];

    this.connectedOperator$.subscribe((connectedOperator: any) => {
      this.connectedOperator = connectedOperator;
      console.log('from operatorrr conneccttteedd', this.connectedOperator);

      if(this.connectedOperator.company?.is_non_vie){
        this.tableColumns = [
          { columnDef: 'client.id', header: 'Numero Client' },

          { columnDef: 'client.user_full_name', header: 'Nom' },

          { 
            columnDef: 'policy_number', 
            header: 'Numero police',
            detail: {
              link: '/policy/details/',
              field: 'id',
            }, 
          },
          { columnDef: 'formatted_avenant', header: 'Avenant' },

          { columnDef: 'operator.full_name', header: 'Operateur' },
          { columnDef: 'agency.name', header: 'Agence' },
          { columnDef: 'agency.sub_agency', header: 'Sous agence' },
          { columnDef: 'category', header: 'Categorie' },
          { columnDef: 'issue_date', header: 'Date effet' },
          { columnDef: 'expiration_date', header: 'Date echeance' },
          { columnDef: 'prime_base', header: 'Prime de base' },
          { columnDef: 'frais', header: 'Frais' },
          { columnDef: 'prime_nette', header: 'Prime nette' },
          { columnDef: 'charges_diverses', header: 'Charges diverses' },
          { columnDef: 'charges_arca', header: 'Charges ARCA' },
          { columnDef: 'tva', header: 'TVA' },

          { columnDef: 'premium_amount', header: 'Prime totale' },
          { columnDef: 'commission', header: 'Commission' },
          // { columnDef: 'id', header: 'ID unique' },
          { columnDef: 'is_saved', header: 'Systeme' },

          {columnDef: 'assured_capital_bif', header : 'VA'},
      



          // { columnDef: 'bill.status', header: 'Status' },
   
          // { columnDef: 'bill.bill_code', header: 'Facture' },
      
      
        ];
      }else{
        this.tableColumns = [
          { 
            columnDef: 'policy_number', 
            header: 'Code police',
            detail: {
              link: '/policy/details/',
              field: 'id',
            }, 
          },
          { columnDef: 'id', header: 'ID unique' },

          { columnDef: 'category', header: 'Categorie' },
      
          { columnDef: 'operator.full_name', header: 'Operateur' },
          { columnDef: 'agency.name', header: 'Agence' },

          { columnDef: 'credit_insurance.is_group', header: 'Groupe' },
          { columnDef: 'period', header: 'Mensualites' },
          { columnDef: 'status', header: 'Statut' },


          { columnDef: 'credit_insurance.is_refinancing', header: 'Refinancement' },
          { columnDef: 'credit_insurance.credit_amount', header: 'Montant du credit' },



          
      
      
          { columnDef: 'premium_amount', header: 'Prime totale' },
          { columnDef: 'commission', header: 'Commission' },



      
      
          // { columnDef: 'bill.bill_code', header: 'Facture' },
      
          { columnDef: 'issue_date', header: 'Date effet' },

          { columnDef: 'expiration_date', header: 'Date echeance' },
      
        ];
      }
      
      // Redirect logic (currently commented out)
      if (!connectedOperator) {
        this.router.navigateByUrl('/login')
      }
    });
  }




}
