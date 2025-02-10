import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../states/auth/auth.state';
import { UserService } from '../../../../core/services/user.service';
import { OperatorService } from '../../../../core/services/operator.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  title = 'Serenity Insurance Company';
  loading = true; // Hide splash screen after some time (e.g., data loaded)
  connectedUser:any  
  connectedUser$!:Observable<any> 
  connectedOperator$!:Observable<any> 

  connectedOperator: any;



  constructor(
    private router : Router,
    private store : Store,
    private userService : UserService,
    private operatorDetails : OperatorService,

  ){
//

this.connectedUser$ = store.select(AuthState.connectedUser)
this.connectedOperator$ = store.select(AuthState.connectedOperator)

  }



  ngOnInit(){

    this.connectedOperator$.subscribe((connectedOperator:any)=>{
      this.connectedOperator = connectedOperator 
      console.log('from operatorrr conneccttteedd', this.connectedOperator)


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









}
