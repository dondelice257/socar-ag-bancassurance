import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { LayoutComponent } from './shared/components/layout-container/layout/layout.component';
import { UnderConstructionComponent } from './shared/components/layout-container/under-construction/under-construction.component';
import { AgenciesListComponent } from './modules/agency/agencies-list/agencies-list.component';
import { RolesListComponent } from './modules/operator/roles-list/roles-list.component';
import { OperatorsListComponent } from './modules/operator/operators-list/operators-list.component';
import { MenusListComponent } from './modules/operator/menus-list/menus-list.component';
import { UsersListComponent } from './modules/authentication/users-list/users-list.component';
import { ClientsListComponent } from './modules/client/clients-list/clients-list.component';
import { ClientSearchComponent } from './modules/client/client-search/client-search.component';
import { PoliciesListComponent } from './modules/policy/policies-list/policies-list.component';
import { PolicyDetailsComponent } from './modules/policy/policy-details/policy-details.component';
import { CreateClientComponent } from './modules/client/create-client/create-client.component';
import { PolicyFormComponent } from './modules/policy/policy-form/policy-form.component';
import { PoliciesOffersComponent } from './modules/policy/policies-offers/policies-offers.component';
import { PolicyRenewComponent } from './modules/policy/policy-renew/policy-renew.component';
import { ChangePasswordComponent } from './modules/authentication/change-password/change-password.component';
import { DeclarationsListComponent } from './modules/policy/declarations-list/declarations-list.component';
import { EncaissementsListComponent } from './modules/policy/encaissements-list/encaissements-list.component';
import { SuperAgentBadgeComponent } from './super-agent/super-agent-badge/super-agent-badge.component';
import { PendingPoliciesComponent } from './modules/policy/pending-policies/pending-policies.component';
import { PolicyChangementDetenteurComponent } from './modules/policy/policy-changement-detenteur/policy-changement-detenteur.component';
import { VignettesListComponent } from './modules/policy/vignettes-list/vignettes-list.component';
import { CreateVignetteComponent } from './modules/policy/create-vignette/create-vignette.component';
import { PolicyChangementPlaqueComponent } from './modules/policy/policy-changement-plaque/policy-changement-plaque.component';
import { PolicyPerteCarteComponent } from './modules/policy/policy-perte-carte/policy-perte-carte.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: DashboardComponent
            },
            {
                path: 'agency',
                component: AgenciesListComponent
            },
            {
                path: 'role',
                component: RolesListComponent
            },
            {
                path: 'operator',
                component: OperatorsListComponent
            },
            {
                path: 'menu',
                component: MenusListComponent
            },
            {
                path: 'user',
                component: UsersListComponent
            },
            {
                path: 'settings/change-password',
                component: ChangePasswordComponent
            },
            {
                path: 'customer',
                component: ClientsListComponent
            },
            {
                path: 'quick-search',
                component: ClientSearchComponent
            },
            {
                path: 'production/automobile',
                component: UnderConstructionComponent
            },
            {
                path: 'production/transport',
                component: UnderConstructionComponent
            },
            {
                path: 'production/new-contract',
                component: PolicyFormComponent
            },
            {
                path: 'production/change_detenteur',
                component: PolicyChangementDetenteurComponent
            },
            {
                path: 'production/change_plaque',
                component: PolicyChangementPlaqueComponent
            },
                        {
                path: 'production/perte_carte',
                component: PolicyPerteCarteComponent
            },
            {
                path: 'production/renew',
                component: PolicyRenewComponent
            },
            {
                path: 'policy/list',
                component: PoliciesListComponent
            },
            {
                path: 'policy/declarations',
                component: DeclarationsListComponent
            },
            {
                path: 'policy/encaissements',
                component: EncaissementsListComponent
            },
            {
                path: 'policy/offer',
                component: PoliciesOffersComponent
            },
            {
                path: 'policy/pending',
                component: PendingPoliciesComponent
            },
            {
                path: 'policy/details/:policyId',
                component: PolicyDetailsComponent
            },

            {
                path: 'client/create',
                component: CreateClientComponent
            },
                        {
                path: 'policy/vignette/list',
                component: VignettesListComponent
            },
                                    {
                path: 'policy/vignette/create',
                component: CreateVignetteComponent
            },
        
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'duplicata',
        component: SuperAgentBadgeComponent
    }

];
