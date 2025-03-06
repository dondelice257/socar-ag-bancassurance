import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss'
})
export class CreateClientComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService)

  private authService = inject(AuthService);

  clientForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [''],
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    phone_number: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    country: ['BURUNDI', Validators.required],
    zone: ['', Validators.required],
    quartier: ['', Validators.required],
    city: ['BUJUMBURA', Validators.required],
    commune: ['', Validators.required],
  });

  isLoading = false;
  errorMessage:any;

  onSubmit() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const client = {'password':this.clientForm.value.username + '1234', ...this.clientForm.value}
    this.authService.signUp(client).subscribe({
      next: (response:any) => {
        console.log('Client created successfully:', response);
        this.toastr.success('Client cree avec succes! Redirection vers la liste des clients ');

        this.isLoading = false;
        this.router.navigateByUrl('/customer')
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
