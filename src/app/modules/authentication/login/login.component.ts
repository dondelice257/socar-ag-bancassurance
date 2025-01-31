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
  
  constructor(
    private formBuilder: FormBuilder, // Inject FormBuilder service
    private authService: AuthService,
    private router : Router,
    private store : Store,
    private userService : UserService,
    private toastr : ToastrService
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Username field with required validation
      password: ['', [Validators.required]]  // Password field with required validation
    });
  }

  ngOnInit() {
    // Initialize the login form with form controls and validators

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
          this.router.navigateByUrl('/');
        this.store.dispatch(new SetAuthenticated(true, response.token, null))

        this.userService.getConnectedUserInfo().subscribe({
          next : (data:any)=>{
        this.store.dispatch(new SetAuthenticated(true, response.token, data))

        // console.log(data, response.token)


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
