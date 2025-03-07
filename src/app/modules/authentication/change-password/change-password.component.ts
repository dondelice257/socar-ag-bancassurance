import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsideMenuComponent } from '../../../shared/components/layout-container/aside-menu/aside-menu.component';
import { SetAuthenticated } from '../../../shared/states/auth/auth.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  showPassword = signal(false);
  passwordValidations = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false
  };

  passwordForm = this.fb.group({
    old_password: ['', Validators.required],
    new_password: ['', [Validators.required, Validators.minLength(8)]],
    confirm_new_password: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService : UserService,
    private router : Router,
    private toastr : ToastrService,
    private store : Store,
  ) {}

  ngOnInit(){

  }

  toggleShowPassword() {
    this.showPassword.set(!this.showPassword());
  }

  validatePassword() {
    const value = this.passwordForm.get('new_password')?.value || '';
    this.passwordValidations.hasUpperCase = /[A-Z]/.test(value);
    this.passwordValidations.hasLowerCase = /[a-z]/.test(value);
    this.passwordValidations.hasNumber = /\d/.test(value);
    this.passwordValidations.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    this.passwordValidations.hasMinLength = value.length >= 8;

  }

  passwordsMatchValidator(form: any) {
    return form.get('new_password')?.value === form.get('confirm_new_password')?.value
      ? null : { passwordMismatch: true };
  }

  onSubmit() {


    this.isLoading = true;

    this.userService.changePassword(this.passwordForm.value).subscribe({
      next: (response:any) => {
        console.log('Client created successfully:', response);
        this.toastr.success('Mot de passe change avec succes, Redirection vers la page de connexion ');

        this.isLoading = false;
        this.store.dispatch(new SetAuthenticated(false, null, null, null))

        this.router.navigateByUrl('/login')
        this.passwordForm.reset();
      },
      error: (error: any) => {
        console.error('Signup error:', error);
        this.isLoading = false;
      
        this.handleError(error)
      },
      
      
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handleError(error: any) {
    console.error('Erreur API:', error);
  
    if (error?.status === 400 && error?.error) {

      const messages = Object.values(error.error).flat();
      messages.forEach((msg: any) => this.toastr.error(msg, 'Erreur côté utilisateur'));
    } 
    else if (error?.status === 403) {
      this.toastr.error("Vous n'avez pas l'autorisation d'effectuer cette action.", 'Accès refusé');
    }
    else if (error?.status === 500) {
      this.toastr.error("Une erreur interne du serveur s'est produite. Réessayez plus tard.", 'Erreur serveur');
    }
    else {
      this.toastr.error("Une erreur s'est produite. Veuillez contacter l'administrateur.", 'Erreur système');
    }
  }
}