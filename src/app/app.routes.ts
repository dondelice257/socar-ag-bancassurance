import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { LayoutComponent } from './shared/components/layout-container/layout/layout.component';
import { SubHeaderComponent } from './shared/components/layout-container/sub-header/sub-header.component';
import { MainContentComponent } from './shared/components/layout-container/main-content/main-content.component';
import { UnderConstructionComponent } from './shared/components/layout-container/under-construction/under-construction.component';
import { NewInsuranceComponent } from './modules/production/automobile/new-insurance/new-insurance.component';
import { AsideMenuComponent } from './shared/components/layout-container/aside-menu/aside-menu.component';
import { AgenciesListComponent } from './modules/agency/agencies-list/agencies-list.component';
import { RolesListComponent } from './modules/operator/roles-list/roles-list.component';
import { OperatorsListComponent } from './modules/operator/operators-list/operators-list.component';
import { MenusListComponent } from './modules/operator/menus-list/menus-list.component';
import { UsersListComponent } from './modules/authentication/users-list/users-list.component';
import { ClientsListComponent } from './modules/client/clients-list/clients-list.component';
import { ClientSearchComponent } from './modules/client/client-search/client-search.component';
import { NewFireInsuranceComponent } from './modules/production/fire-insurance/new-insurance/new-insurance.component';
import { PoliciesListComponent } from './modules/policy/policies-list/policies-list.component';
import { PolicyDetailsComponent } from './modules/policy/policy-details/policy-details.component';
import { CreateClientComponent } from './modules/client/create-client/create-client.component';

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
                path: 'production/fire',
                component: NewFireInsuranceComponent
            },
            {
                path: 'policy/list',
                component: PoliciesListComponent
            },
            {
                path: 'policy/details/:policyId',
                component: PolicyDetailsComponent
            },

            {
                path: 'client/create',
                component: CreateClientComponent
            },
        
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
