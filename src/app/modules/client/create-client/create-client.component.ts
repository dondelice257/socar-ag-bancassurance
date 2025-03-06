import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  errorMessage: string | null = null;

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
        this.isLoading = false;
        this.router.navigateByUrl('/customer')
        this.clientForm.reset();
      },
      error: (error:any) => {
        console.error('Signup error:', error);
        this.isLoading = false;

        this.errorMessage = error?.error?.message || 'An error occurred. Please try again.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
