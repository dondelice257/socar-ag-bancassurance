import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fire-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fire-form.component.html',
  styleUrl: './fire-form.component.scss'
})
export class FireFormComponent {
  // Form group that holds all form controls
  insuranceForm: FormGroup;

  // Outputs events to notify the parent component when the form data changes
  @Output() body = new EventEmitter<{}>();         // Emits form data
  @Output() isFormValid = new EventEmitter<boolean>(); // Emits form validation status

  constructor(private fb: FormBuilder) {
    // Initializing the reactive form with required fields
    this.insuranceForm = this.fb.group({
      nature_risque: ['', Validators.required],  // Nature of risk (required)
      quartier: ['', Validators.required],       // Neighborhood (required)
      province: ['', Validators.required],       // Province (required)
      cadastre: [''],       // Land registry number (required)
      titre: [''],          // Title number (required)
    });
  }

  ngOnInit(): void {
    // Listen for form changes and emit updated values
    this.insuranceForm.valueChanges.subscribe(() => {
      this.emitFormData();
    });
  }

  /**
   * Emits form data and validation status to the parent component.
   * This allows the parent to track the current form state and enable/disable navigation.
   */
  private emitFormData(): void {
    const body = this.insuranceForm.value;
    this.body.emit(body);                         // Send form data
    this.isFormValid.emit(this.insuranceForm.valid); // Send validation status
  }
}
