import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auto-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './auto-form.component.html',
  styleUrl: './auto-form.component.scss'
})
export class AutoFormComponent {

  insuranceForm: FormGroup;

  @Output() body = new EventEmitter<{}>();
  @Output() isFormValid = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
  this.insuranceForm = this.fb.group({
    chasis: ['', Validators.required],
    plaque: ['', Validators.required],
    limites_territoriales: ['', Validators.required],
    usage: ['', Validators.required],
    marque: ['', Validators.required],
    model: ['', Validators.required],
    annee_fabrication: ['', Validators.required],
    puissance_moteur: ['', Validators.required],
    classe: ['', Validators.required],
    places_cabine: ['', Validators.required],
    places_plateau: ['', Validators.required],





  });
}

ngOnInit(): void {
  this.insuranceForm.valueChanges.subscribe(() => {
    this.emitFormData();
  });
}

private emitFormData(): void {

  const body = this.insuranceForm.value
  this.body.emit(body);
  this.isFormValid.emit(this.insuranceForm.valid);
}
}
