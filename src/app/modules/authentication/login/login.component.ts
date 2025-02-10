import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import form-related modules
import { AuthService } from '../../../core/services/auth.service';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthState} from '../../../shared/states/auth/auth.state';
import { Store } from '@ngxs/store';
import { SetAuthenticated } from '../../../shared/states/auth/auth.action';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { OperatorService } from '../../../core/services/operator.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule, RouterModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Define the login form FormGroup
  isLoading: boolean=false
  isAuthenticated = false
  isAuthenticated$:Observable<boolean> 
  
  constructor(
    private formBuilder: FormBuilder, // Inject FormBuilder service
    private authService: AuthService,
    private router : Router,
    private store : Store,
    private userService : UserService,
    private operatorService : OperatorService,

    private toastr : ToastrService
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Username field with required validation
      password: ['', [Validators.required]]  // Password field with required validation
    });

this.isAuthenticated$ = store.select(AuthState.isAuthenticated)

  }

  ngOnInit() {
    // Initialize the login form with form controls and validators
    this.isAuthenticated$.subscribe((isAuthenticated:boolean)=>{
      this.isAuthenticated = isAuthenticated 
      console.log('conneccttteedd APP', this.isAuthenticated)

      if(isAuthenticated){
    this.router.navigateByUrl('/home')

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

  // Convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }



  onSubmit() {
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;

    // Form is valid, proceed with authentication
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(body).subscribe({
      next:(response:any)=>{

        this.isLoading=false
        if(response.token){
          this.store.dispatch(new SetAuthenticated(true, response.token, null, null))
          this.router.navigateByUrl('/home');

        this.userService.getConnectedUserInfo().subscribe({
          next : (data:any)=>{
        this.store.dispatch(new SetAuthenticated(true, response.token, data, null))
          console.log('connected user', data)



        this.userService.getConnectedOperator(data[0].id).subscribe((connectedOperator:any)=>{
          console.log('connected Operator', connectedOperator)

          this.store.dispatch(new SetAuthenticated(true, response.token, data, null))

          
          this.operatorService.getOperatorDetails(connectedOperator[0].id).subscribe((connectedOperator:any)=>{
            console.log('connected Operator details', connectedOperator)

            this.store.dispatch(new SetAuthenticated(true, response.token, data, connectedOperator))

          })


          // this.store.dispatch(new SetAuthenticated(true, response.token, data))
        })

        console.log(data, response.token)


          }
        })

        
//


        }else{


          this.toastr.error(response.response_message);

        }
        //
      },
      error:(err)=>{
        this.isLoading=false

        // console.log('elllleh',err);
        if(err.non_field_errors){


          this.toastr.error(err.non_field_errors[0]);


        }else{


          this.toastr.error('Login failed, please try again');

        }
       
        //
      }
    });
  }
}
