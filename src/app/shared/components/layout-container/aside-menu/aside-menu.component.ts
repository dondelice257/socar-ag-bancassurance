import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetAuthenticated } from '../../../states/auth/auth.action';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {


  activeMenu: string | null = null;

  menus = [
    {
      title: 'Tableau de bord',
      icon: 'fa fa-gauge',
      link: '/',
      subMenus: []
    },
    {
      title: 'Production',
      icon: 'fa fa-cogs',
      subMenus: [
        { title: 'Automobiles', link: '/production/automobiles' },
        { title: 'Incendies', link: '/production/incendies' },
        { title: 'Transport', link: '/production/transport' }
      ]
    },
    // {
    //   title: 'Administrations',
    //   icon: 'fa fa-building',
    //   subMenus: [
    //     { title: 'Utilisateurs', link: '/administration/utilisateurs' },
    //     { title: 'Rôles & Permissions', link: '/administration/roles' },
    //     { title: 'Paramètres', link: '/administration/parametres' }
    //   ]
    // },
    // {
    //   title: 'Comptabilité',
    //   icon: 'fa fa-calculator',
    //   subMenus: [
    //     { title: 'Facturation', link: '/comptabilite/facturation' },
    //     { title: 'Paiements', link: '/comptabilite/paiements' },
    //     { title: 'Reçus', link: '/comptabilite/recus' }
    //   ]
    // },
    // {
    //   title: 'Sinistres',
    //   icon: 'fa fa-car-crash',
    //   subMenus: [
    //     { title: 'Déclarations', link: '/sinistres/declarations' },
    //     { title: 'Expertises', link: '/sinistres/expertises' },
    //     { title: 'Indemnisations', link: '/sinistres/indemnisations' }
    //   ]
    // },
    // {
    //   title: 'Audit',
    //   icon: 'fa fa-search',
    //   subMenus: [
    //     { title: 'Suivi des opérations', link: '/audit/suivi' },
    //     { title: 'Contrôles internes', link: '/audit/controle' }
    //   ]
    // },
    {
      title: 'Commercial',
      icon: 'fa fa-briefcase',
      subMenus: [
        { title: 'Clients', link: '/commercial/clients' },
        { title: 'Offres', link: '/commercial/offres' }
      ]
    },
    {
      title: 'Rapports',
      icon: 'fa fa-file-alt',
      link: '/rapports',
      subMenus: []
    }
  ];

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  toggleMenu(title: string) {
    this.activeMenu = this.activeMenu === title ? null : title;
  }

  logout(){
    this.store.dispatch(new SetAuthenticated(false, null, null))
    this.router.navigateByUrl('/login');

  }

}
