import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetAuthenticated } from '../../../states/auth/auth.action';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { AuthState } from '../../../states/auth/auth.state';

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
  connectedOperator:any  
  connectedOperator$!:Observable<any> 

  menus:any = [];

  constructor(
    private store: Store,
    private router: Router,
    private userService : UserService,

  ) {
this.connectedOperator$ = store.select(AuthState.connectedOperator)


  }


  ngOnInit(): void {

        this.connectedOperator$.subscribe((connectedOperator:any)=>{
      this.connectedOperator = connectedOperator 
      console.log('conneccttteedddd2', this.connectedOperator)
      
      this.getMenusList()

      if(!connectedOperator){
    // this.router.navigateByUrl('/login')

      }


      // this.router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     window.scrollTo(0, 0); // Scroll to top of the page

      //     console.log('NavigationEnd event:', event);
      //     // this.vps.scrollToPosition([0,0]);
      //   }
      // });
    })
  }



  toggleMenu(title: string) {
    this.activeMenu = this.activeMenu === title ? null : title;
  }

  logout(){
    this.store.dispatch(new SetAuthenticated(false, null, null, null))
    this.router.navigateByUrl('/login');

  }

  getMenusList(){
if(this.connectedOperator){
  this.menus = this.connectedOperator.accessible_menus

}
  }

}
