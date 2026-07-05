import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../shared/states/auth/auth.state';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService)

      connectedOperator$!: Observable<any>;
      connectedOperator: any;
  private authService = inject(AuthService);

  clientForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]],
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required]],
    phone_number: ['+257'],
    country: ['BURUNDI'],
    zone: [''],
    quartier: [''],
    city: ['BUJUMBURA'],
    commune: [''],
    create_client:false
  });

  isLoading = false;
  errorMessage:any;

  constructor(
    private store : Store
  ){
    this.connectedOperator$ = this.store.select(AuthState.connectedOperator);

  }


  ngOnInit(){
    this.clientForm.valueChanges.subscribe(() => {

      const first_name = this.clientForm.get('first_name')?.value

      const username = first_name.replace(/\s+/g, '').toLowerCase();

      this.clientForm.patchValue({
        username: username
      })
    });

    this.connectedOperator$.subscribe((connectedOperator: any) => {
      this.connectedOperator = connectedOperator;

      })
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const client = {'agency':this.connectedOperator.agency.id, 'password':this.clientForm.value.username + '1234', ...this.clientForm.value}
    this.authService.signUp(client).subscribe({
      next: (response:any) => {
        console.log('Client created successfully:', response);
        this.toastr.success('Client cree avec succes! Redirection vers la liste des clients ');

        this.isLoading = false;
        this.router.navigateByUrl('/user')
        this.clientForm.reset();
      },
      error: (error: any) => {
        console.error('Signup error:', error);
        this.isLoading = false;
      
        if (error?.response_message) {
          if (typeof error.response_message === 'object') {
            // Extract all error messages dynamically
            const messages = Object.values(error.response_message).flat();
      
            // Show each error message in a separate toast
            messages.forEach((msg:any) => this.toastr.error(msg));
          } else {
            this.toastr.error(error.response_message);
          }
        } else {
          this.toastr.error('An error occurred. Please try again.');
        }
      },
      
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
