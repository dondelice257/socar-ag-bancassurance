import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../states/auth/auth.state';
import { UserService } from '../../../../core/services/user.service';

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
  connectedOperator: any;



  constructor(
    private router : Router,
    private store : Store,
    private userService : UserService,
  ){
//

this.connectedUser$ = store.select(AuthState.connectedUser)
  }



  ngOnInit(){

    this.connectedUser$.subscribe((connectedUser:any)=>{
      this.connectedUser = connectedUser 

      this.getConnectedOperator()  // Get connected operator information when connectedUser is available

      if(!connectedUser){
    this.router.navigateByUrl('/login')

      }


      console.log('conneccttteedd', this.connectedUser)
      // this.router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     window.scrollTo(0, 0); // Scroll to top of the page

      //     console.log('NavigationEnd event:', event);
      //     // this.vps.scrollToPosition([0,0]);
      //   }
      // });
    })



  }


  getConnectedOperator(){

    if(this.connectedUser){
      this.userService.getConnectedOperator(this.connectedUser[0].id).subscribe((connectedOperator:any)=>{
        console.log('connectedOperator', connectedOperator)

        this.connectedOperator = connectedOperator[1]
      })

    }
  }






}
