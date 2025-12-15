import { Component } from '@angular/core';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { Observable } from 'rxjs';
import { PolicyService } from '../../../core/services/policy.service';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { AuthState } from '../../../shared/states/auth/auth.state';

@Component({
  selector: 'app-auto-policies-list',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './auto-policies-list.component.html',
  styleUrl: './auto-policies-list.component.scss'
})
export class AutoPoliciesListComponent {

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
      },

  ];

    this.connectedOperator$.subscribe((connectedOperator: any) => {
      this.connectedOperator = connectedOperator;
      console.log('from operatorrr conneccttteedd', this.connectedOperator);

        this.tableColumns = [
          { columnDef: 'client.id', header: 'Numero Client' },

          { columnDef: 'client.user_full_name', header: 'Nom' },
          { columnDef: 'client.user_phone_number', header: 'Tel' },


          { 
            columnDef: 'policy_number', 
            header: 'Numero police',
            // detail: {
            //   link: '/policy/details/',
            //   field: 'id',
            // }, 
          },
          { columnDef: 'formatted_avenant', header: 'Avenant' },

          { columnDef: 'operator.full_name', header: 'Operateur' },
          { columnDef: 'agency.name', header: 'Agence' },
          { columnDef: 'agency.sub_agency', header: 'Sous agence' },
          { columnDef: 'category', header: 'Categorie' },
          { columnDef: 'issue_date', header: 'Date effet', type: 'date' },
          { columnDef: 'expiration_date', header: 'Date echeance', type: 'date' },
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
          {columnDef: 'assured_capital_bif', header : 'VA'},

          {columnDef: 'auto_insurance.numero_vignette', header : 'Vignette'},
          // {columnDef: 'fire_insurance.cadastre', header : 'No Cadastre'},
          // {columnDef: 'fire_insurance.titre', header : 'Titre'},
          // {columnDef: 'fire_insurance.quartier', header : 'Emplacement'},





      



          // { columnDef: 'bill.status', header: 'Status' },
   
          // { columnDef: 'bill.bill_code', header: 'Facture' },
      
      
        ];

      
      // Redirect logic (currently commented out)
      if (!connectedOperator) {
        this.router.navigateByUrl('/login')
      }
    });
  }

}
