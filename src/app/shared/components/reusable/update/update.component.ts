import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../../../core/services/general.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  @Input() id: string ='';
  @Input() title: string = '';
  @Input() url: string = '';
  @Input() body: any = {};
  @Output() saved = new EventEmitter<boolean>();

  form: FormGroup = this.fb.group({});
  isLoading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private generalService: GeneralService) {}

  ngOnChanges() {
    this.buildForm();
  }

buildForm() {
  if (!this.body) return;

  const group: any = {};

  Object.keys(this.body).forEach(key => {
    const field = this.body[key];

    if (typeof field === 'object' && field !== null) {
      group[key] = [field.value, Validators.required];
    } else {
      group[key] = [field, Validators.required];
    }
  });

  this.form = this.fb.group(group);
}

  onSave() {
    // if (this.form.invalid) return;
    this.isLoading = true;
    this.error = null;
    const data = this.form.value;

    const req$ = this.generalService.Update(this.url, this.id, data)
    req$.subscribe({
      next: (res) => {
        this.isLoading = false;
        this.saved.emit(true);
      },
error: (err) => {
  this.isLoading = false;

  if (err.error && typeof err.error === 'object') {

    const firstKey = Object.keys(err.error)[0];

    this.error = Array.isArray(err.error[firstKey])
      ? err.error[firstKey][0]
      : err.error[firstKey];

  } else {
    this.error = err.message || 'An error occurred';
  }
}
    });
  }

  // onCancel() {
  //   this.cancelled.emit();
  // }
}
