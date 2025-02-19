import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transport-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './transport-form.component.html',
  styleUrl: './transport-form.component.scss'
})
export class TransportFormComponent {

  insuranceForm: FormGroup;

  @Output() body = new EventEmitter<{}>();
  @Output() isFormValid = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
  this.insuranceForm = this.fb.group({
    nature_marchandise: ['', Validators.required],
    description: ['', Validators.required],
    nature_emballage: ['', Validators.required],
    depart: ['', Validators.required],
    arrivee: ['', Validators.required],
    quantity: ['', Validators.required],
    colis_number: ['', Validators.required],
    reference: ['', Validators.required],







  });
}

ngOnInit(): void {
  this.insuranceForm.valueChanges.subscribe(() => {
    this.emitFormData();
  });
}

private emitFormData(): void {
  const body = this.insuranceForm.value; // Get all form values directly

  this.body.emit(body);
  this.isFormValid.emit(this.insuranceForm.valid);
}
}
