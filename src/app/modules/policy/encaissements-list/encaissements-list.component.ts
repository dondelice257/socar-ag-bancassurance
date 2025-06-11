import { Component } from '@angular/core';
import { AuthState } from '../../../shared/states/auth/auth.state';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PolicyService } from '../../../core/services/policy.service';
import { Observable } from 'rxjs';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encaissements-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],
  templateUrl: './encaissements-list.component.html',
  styleUrl: './encaissements-list.component.scss'
})
export class EncaissementsListComponent {
    // Observable for the currently logged-in operator
    connectedOperator$!: Observable<any>;
    connectedOperator: any;
    tableColumns: any[] = [];
    tableData: any;
    isLoading = false

    constructor(
        private policyService:
         PolicyService,
        private store: Store,
        private router: Router
    ) {
        this.connectedOperator$ = this.store.select(AuthState.connectedOperator);
    }

    ngOnInit() {


        this.connectedOperator$.subscribe((connectedOperator: any) => {
            this.connectedOperator = connectedOperator;
            console.log('from operatorrr conneccttteedd', this.connectedOperator);

                this.tableColumns = [
                    { columnDef: 'client.id', header: 'Numero Client' },
                    { columnDef: 'client.user_full_name', header: 'Nom' },
                    { 
                        columnDef: 'policy_number', 
                        header: 'Numero police',
                    },
                    { columnDef: 'operator.full_name', header: 'Operateur' },
                    { columnDef: 'agency.name', header: 'Agence' },
                    { columnDef: 'agency.sub_agency', header: 'Sous agence' },
                    { columnDef: 'category', header: 'Categorie' },
                    { columnDef: 'issue_date', header: 'Date effet' },
                    { columnDef: 'expiration_date', header: 'Date echeance' },
                    { columnDef: 'prime_nette', header: 'Prime Nette' },
                    { columnDef: 'premium_amount', header: 'Prime totale' },
                    { columnDef: 'commission', header: 'Commission' },
                ];
            
            // Redirect logic (currently commented out)
            if (!connectedOperator) {
                this.router.navigateByUrl('/login')
            }
        });
    }


}
