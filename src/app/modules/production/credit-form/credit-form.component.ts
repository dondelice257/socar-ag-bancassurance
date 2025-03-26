import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LookupComponent } from '../../../shared/components/reusable/lookup/lookup.component';

@Component({
  selector: 'app-credit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule, 
    LookupComponent
  ],
  templateUrl: './credit-form.component.html',
  styleUrl: './credit-form.component.scss'
})
export class CreditFormComponent {

  insuranceForm: FormGroup;






  @Output() body = new EventEmitter<{}>();
  @Output() isFormValid = new EventEmitter<boolean>();
  @Input() initialValue = {};
  @Input() selectedCategory = '';



  constructor(private fb: FormBuilder) {
  this.insuranceForm = this.fb.group({
    raison_sociale: [''],
    coverage: ['', Validators.required],
    is_refinancing: [false, Validators.required],
    is_group: [false, Validators.required],
    // credit_amount: ['', Validators.required],
    // ongoing_amount: [''],
    base_policy: [''],







  });
}

ngOnInit(): void {
  this.insuranceForm.valueChanges.subscribe(() => {
    this.emitFormData();

    if(!this.insuranceForm.get('is_refinancing')?.value){
    this.insuranceForm.patchValue({base_policy:'', ongoing_amount:''})

    }
  });

  if(this.selectedCategory=='credit'){
    this.insuranceForm.patchValue(this.initialValue)
  }

}

private emitFormData(): void {

  const body = this.insuranceForm.value
  this.body.emit(body);
  this.isFormValid.emit(this.insuranceForm.valid);
}

onPolicySelected(policy: any) {
  this.insuranceForm.patchValue({base_policy: policy.lookup_field9});
}
}
  