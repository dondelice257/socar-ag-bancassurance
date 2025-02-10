import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LookupComponent } from '../../../../shared/components/reusable/lookup/lookup.component';


@Component({
  selector: 'app-new-insurance',
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    NgxPrintModule,
    LookupComponent
  ],
  templateUrl: './new-insurance.component.html',
  styleUrl: './new-insurance.component.scss'
})
export class NewInsuranceComponent {
  step = 1;
  insuranceForm: FormGroup;
  selectedClientId: string | null = null;
  endDate: string = '';
  selectedGuarantees: number[] = [];

  marques = ['Toyota', 'Mercedes', 'BMW', 'Nissan']; // Liste temporaire
  puissances = ['100 CV', '150 CV', '200 CV', '250 CV']; // Liste temporaire
  usages = ['Particulier', 'Commercial', 'Industriel']; // Liste temporaire
  periods = ['Annuel', 'Trimestre', 'Semestre', 'Mois', 'Custom']; // Liste temporaire

  guarantees = [
    { id: 1, name: 'Responsabilité Civile' },
    { id: 2, name: 'Dégâts Matériels' },
    { id: 3, name: 'Vol' },
    { id: 4, name: 'Incendie' }
  ];

  constructor(private fb: FormBuilder) {
    this.insuranceForm = this.fb.group({
      clientId: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      plaque: ['', Validators.required],
      chasis: ['', Validators.required],
      puissanceMoteur: ['', Validators.required],
      usageType: ['', Validators.required],
      startDate: ['', Validators.required],
      period: ['', Validators.required],
      customDays: [''],
      capitalAssure: [''], // Validation min 100,000
    });
  }

  onClientSelected(clientId: string) {
    this.selectedClientId = clientId;
    this.insuranceForm.patchValue({ clientId });
  }

  onNext() {
    if (this.step === 1 && this.selectedClientId) {
      this.step++;
    } else if (this.step === 2 && this.insuranceForm.valid) {
    console.log('Formulaire etape 2:', { ...this.insuranceForm.value, selectedGuarantees: this.selectedGuarantees });

      this.calculateEndDate();
      this.step++;
    }
  }

  onBack() {
    if (this.step > 1) this.step--;
  }

  onPeriodChange() {
    this.calculateEndDate();
  }

  calculateEndDate() {
    const startDate = new Date(this.insuranceForm.get('startDate')?.value);
    const period = this.insuranceForm.get('period')?.value;
    const daysToAdd: { [key: string]: number } = {
      Annuel: 365,
      Trimestre: 90,
      Semestre: 180,
      Mois: 30,
      Custom: Number(this.insuranceForm.get('customDays')?.value || 0)
    };

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + daysToAdd[period]);
    this.endDate = endDate.toISOString().split('T')[0];
  }

  toggleGuarantee(guaranteeId: number) {
    this.selectedGuarantees = this.selectedGuarantees.includes(guaranteeId)
      ? this.selectedGuarantees.filter(id => id !== guaranteeId)
      : [...this.selectedGuarantees, guaranteeId];
  }

  onSubmit() {
    console.log('Formulaire soumis:', { ...this.insuranceForm.value, selectedGuarantees: this.selectedGuarantees });
  }
}

