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
  @Input() id: number | null = null;
  @Input() title: string = '';
  @Input() url: string = '';
  @Input() body: any = {};
  @Output() saved = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

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
      group[key] = [this.body[key], Validators.required];
    });
    this.form = this.fb.group(group);
  }

  onSave() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.error = null;
    const data = this.form.value;
    
    // const req$ = this.id
    //   ? this.generalService.apiService.put(this.url + this.id + '/', data)
    //   : this.generalService.apiService.post(this.url, data);
    // req$.subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     this.saved.emit(res);
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     this.error = err?.message || 'An error occurred';
    //   }
    // });
  }

  onCancel() {
    this.cancelled.emit();
  }
}
