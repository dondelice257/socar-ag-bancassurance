import { Component } from '@angular/core';
import { AsideMenuComponent } from '../aside-menu/aside-menu.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AsideMenuComponent,
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'

  
})
export class LayoutComponent {

}
