import { Component } from '@angular/core';
import { PolicyService } from '../../../core/services/policy.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../shared/states/auth/auth.state';
import { Router } from '@angular/router';
import { BranchState } from '../../../shared/states/selectedBranch/branch.state';

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
  selectedBranch: string = '';
  selectedBranch$!: Observable<string|null>;



   private baseColumns = [
    { columnDef: 'client.id', header: 'Numero Client' },
    { columnDef: 'client.user_full_name', header: 'Nom' },
    { columnDef: 'client.user_phone_number', header: 'Tel' },
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
    { columnDef: 'is_saved', header: 'Systeme' },
    { columnDef: 'assured_capital_bif', header: 'VA' },
  ];

  // Branch-specific columns
  private autoColumns = [
    { columnDef: 'auto_insurance.plaque', header: 'Plaque' },
    { columnDef: 'auto_insurance.chasis', header: 'Chasis' },
    { columnDef: 'auto_insurance.usage', header: 'Usage' },
    { columnDef: 'auto_insurance.marque', header: 'Marque' },
    { columnDef: 'auto_insurance.model', header: 'Modele' },
    { columnDef: 'auto_insurance.annee_fabrication', header: 'Annee de fabrication' },
    { columnDef: 'auto_insurance.puissance_moteur', header: 'Puissance Moteur' },
    { columnDef: 'auto_insurance.classe', header: 'Classe' },
    { columnDef: 'auto_insurance.places_cabine', header: 'Places cabine' },
    { columnDef: 'auto_insurance.places_plateau', header: 'Places plateau' },
    { columnDef: 'auto_insurance.vignette_data.code', header: 'Numero vignette' },
    { columnDef: 'auto_insurance.vignette_data.is_used', header: 'Cart Impr'},








  ];

  private fireColumns = [
    { columnDef: 'beneficiaire', header: 'Beneficiaire' },
    { columnDef: 'fire_insurance.nature_risque', header: 'Nature du risque' },
    { columnDef: 'fire_insurance.quartier', header: 'Localisation' },
    { columnDef: 'fire_insurance.province', header: 'Province' },




    { columnDef: 'fire_insurance.cadastre', header: 'No Cadastre' },
    { columnDef: 'fire_insurance.titre', header: 'Titre' },
  ];

  private transportColumns = [
    { columnDef: 'transport_insurance.nature_marchandise', header: 'Nature' },
    { columnDef: 'transport_insurance.description', header: 'Description' },
    { columnDef: 'transport_insurance.depart', header: 'Depart' },
    { columnDef: 'transport_insurance.arrivee', header: 'Arrivee' },
    { columnDef: 'transport_insurance.quantity ', header: 'Qte' },
    { columnDef: 'transport_insurance.colis ', header: 'Colis' },
    { columnDef: 'transport_insurance.packaging ', header: 'Pack' },
    { columnDef: 'transport_insurance.transport_type ', header: 'Type' },
    { columnDef: 'transport_insurance.nature_emballage', header: 'Emballage' },
    { columnDef: 'transport_insurance.descriptif_marchandise ', header: 'Descriptif' },
    { columnDef: 'transport_insurance.reference ', header: 'Ref' },













  ];


  constructor(
    private policyService : PolicyService,
    private store : Store,
    private router : Router
  ){
    this.connectedOperator$ = this.store.select(AuthState.connectedOperator);
    this.selectedBranch$ = this.store.select(BranchState.selectedBranch);

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


  this.selectedBranch$.subscribe((branch:any) => {
      const branchValue = branch ;
      this.updateColumnsForBranch(branchValue);
      this.selectedBranch = branchValue;
    });

    this.connectedOperator$.subscribe((connectedOperator: any) => {
      this.connectedOperator = connectedOperator;
      console.log('from operatorrr conneccttteedd', this.connectedOperator);

      if(this.connectedOperator.company?.is_non_vie){

      this.updateColumnsForBranch(this.selectedBranch);
      
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
          // { columnDef: 'status', header: 'Statut' },


          { columnDef: 'credit_insurance.is_refinancing', header: 'Refinancement' },
          { columnDef: 'credit_insurance.credit_amount', header: 'Montant du credit' },



          
      
      
          { columnDef: 'premium_amount', header: 'Prime totale' },
          { columnDef: 'commission', header: 'Commission' },



      
      
          // { columnDef: 'bill.bill_code', header: 'Facture' },
      
          { columnDef: 'issue_date', header: 'Date effet', type: 'date' },

          { columnDef: 'expiration_date', header: 'Date echeance', type: 'date' },
      
        ];
      }
      
      // Redirect logic (currently commented out)
      if (!connectedOperator) {
        this.router.navigateByUrl('/login')
      }
    });
  }

  updateColumnsForBranch(branch: string) {
    this.selectedBranch = branch;
    
    // Start with base columns
    // this.tableColumns = [...this.baseColumns];

    console.log('Selected branch in updateColumnsForBranch:', branch);

    // Add branch-specific columns
    switch(this.selectedBranch) {
      case '':
        this.tableColumns = [...this.baseColumns];
        break;
      case 'auto':
        this.tableColumns = [...this.baseColumns, ...this.autoColumns];
        break;
      case 'fire':
        this.tableColumns = [...this.baseColumns, ...this.fireColumns];
        break;
      case 'transport':
        this.tableColumns = [...this.baseColumns, ...this.transportColumns];
        break;
      default:

        break;
    }
  }

  updateBranch(event:any){
    this.updateColumnsForBranch(this.selectedBranch);
  }





}
