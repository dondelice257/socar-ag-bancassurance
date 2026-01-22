import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { GeneralService } from '../../../core/services/general.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PolicyService } from '../../../core/services/policy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-vignette',
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-vignette.component.html',
  styleUrl: './create-vignette.component.scss'
})
export class CreateVignetteComponent {
    fb= inject(FormBuilder)
    isLoading = false
    toastr = inject(ToastrService)


  agencies:any
  vignetteForm: FormGroup = this.fb.group({
    start_code: [''],
    end_code: [''],
    agency: ['']
  })



  generalService = inject(GeneralService)
  policyService = inject(PolicyService)

  constructor(
  ) {

  }

  ngOnInit(){
    this.getAgencies()
  }

  getAgencies(){
    this.generalService.GetAgencies().subscribe((data:any)=>{
      this.agencies = data
      console.log('Agencies loaded', this.agencies)
    })
  }

  selectAgency(event:any){
    console.log('Selected agency:', event)
    this.vignetteForm.patchValue({ agency: event })
    console.log('Vignette form updated:', this.vignetteForm.value)
  }

  createVignette() {
  this.isLoading = true;





  this.policyService.createVignette(this.vignetteForm.value).subscribe(
    (response: any) => {
      this.isLoading = false;
      this.toastr.success('Les vignettes ont été créées avec succès !', 'Succès');

      console.log('Vignettes créées:', response);
    },
    (error) => {
      this.isLoading = false;
      this.handleError(error);
    }
  );
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
