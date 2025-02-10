import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SuperAgentBadgeComponent } from './super-agent/super-agent-badge/super-agent-badge.component';
import { ViewportScroller } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from './shared/states/auth/auth.state';
import { CoreModule } from './core/services/core.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SuperAgentBadgeComponent, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Serenity Insurance Company';
  loading = true; // Hide splash screen after some time (e.g., data loaded)
  isAuthenticated = false
  isAuthenticated$:Observable<boolean> 
  widget = 'https://widgets.leapa.co/customer.js'



  constructor(
    private router : Router,
    private store : Store,
  ){
//

this.isAuthenticated$ = store.select(AuthState.isAuthenticated)
  }



  ngOnInit(){

    this.isAuthenticated$.subscribe((isAuthenticated:boolean)=>{
      this.isAuthenticated = isAuthenticated 
      console.log('conneccttteedd APP', this.isAuthenticated)
      // this.router.navigateByUrl('/home')

      if(isAuthenticated){
    // this.router.navigateByUrl('/home')

    console.log('conneccttteedd', this.isAuthenticated)


      }else{
    this.router.navigateByUrl('/login')

      }


      console.log('conneccttteedd', this.isAuthenticated)
      // this.router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     window.scrollTo(0, 0); // Scroll to top of the page

      //     console.log('NavigationEnd event:', event);
      //     // this.vps.scrollToPosition([0,0]);
      //   }
      // });
    })



  }



  

  ngAfterViewInit(){

    setTimeout(() => {
      this.loading = false; // Hide splash screen after some time (e.g., data loaded)
    }, 4000); 

  }

}
