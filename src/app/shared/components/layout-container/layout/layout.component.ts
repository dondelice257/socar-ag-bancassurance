import { Component, HostListener } from '@angular/core';
import { AsideMenuComponent } from '../aside-menu/aside-menu.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AsideMenuComponent,
    HeaderComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'

  
})
export class LayoutComponent {
  sidebarVisible: boolean = false;


  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }




}
