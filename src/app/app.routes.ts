import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { LayoutComponent } from './shared/components/layout-container/layout/layout.component';
import { SubHeaderComponent } from './shared/components/layout-container/sub-header/sub-header.component';
import { MainContentComponent } from './shared/components/layout-container/main-content/main-content.component';
import { UnderConstructionComponent } from './shared/components/layout-container/under-construction/under-construction.component';
import { NewInsuranceComponent } from './modules/production/automobile/new-insurance/new-insurance.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'production',
                component: MainContentComponent,
                children: [
                    { path: 'automobiles', component: NewInsuranceComponent },
                    { path: 'incendies', component: UnderConstructionComponent },
                    { path: 'transport', component: UnderConstructionComponent }
                ]
            },
            {
                path: 'administration',
                component: MainContentComponent,
                children: [
                    { path: 'utilisateurs', component: UnderConstructionComponent },
                    { path: 'roles', component: UnderConstructionComponent },
                    { path: 'parametres', component: UnderConstructionComponent }
                ]
            },
            {
                path: 'comptabilite',
                component: MainContentComponent,
                children: [
                    { path: 'facturation', component: UnderConstructionComponent },
                    { path: 'paiements', component: UnderConstructionComponent },
                    { path: 'recus', component: UnderConstructionComponent }
                ]
            },
            {
                path: 'sinistres',
                component: MainContentComponent,
                children: [
                    { path: 'declarations', component: UnderConstructionComponent },
                    { path: 'expertises', component: UnderConstructionComponent },
                    { path: 'indemnisations', component: UnderConstructionComponent }
                ]
            },
            {
                path: 'audit',
                component: MainContentComponent,
                children: [
                    { path: 'suivi', component: UnderConstructionComponent },
                    { path: 'controle', component: UnderConstructionComponent }
                ]
            },
            {
                path: 'commercial',
                component: MainContentComponent,
                children: [
                    { path: 'clients', component: UnderConstructionComponent },
                    { path: 'prospects', component: UnderConstructionComponent },
                    { path: 'offres', component: UnderConstructionComponent }
                ]
            },
            {
                path: 'rapports',
                component: UnderConstructionComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
