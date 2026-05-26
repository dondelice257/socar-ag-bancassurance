import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { LookupComponent } from '../../../shared/components/reusable/lookup/lookup.component';
import { PolicyService } from '../../../core/services/policy.service';

@Component({
  selector: 'app-auto-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LookupComponent
  ],
  templateUrl: './auto-form.component.html',
  styleUrl: './auto-form.component.scss'
})
export class AutoFormComponent {

  insuranceForm: FormGroup;

  isLoading = false;

  tariffResult: any = null;
  errorTariff: any = null;


  marques: string[] = [
    'TOYOTA', 'VOLKSWAGEN', 'BMW', 'MERCEDES-BENZ', 'FORD',
    'HONDA', 'CHEVROLET', 'NISSAN', 'HYUNDAI', 'AUDI',
    'KIA', 'PEUGEOT', 'RENAULT', 'FIAT', 'JEEP', 'LAND ROVER',
    'TESLA', 'SUBARU', 'MAZDA', 'MITSUBISHI', 'PORSCHE',
    'JAGUAR', 'LEXUS', 'ACURA', 'INFINITI', 'MINI', 'DODGE',
    'CHRYSLER', 'CITROËN', 'SAAB', 'ALFA ROMEO',
    'SUZUKI', 'HONDA', 'MERCEDES', 'VOLVO', 'HOWO', 'MACHINE',
    'DAIHATSU'
  ];

  classes:string[]= [
    'Vehicule (4pass.)',
    'Vehicule (+4pass.)',
    'Voiture taxi (4 pass.)',
    'Voiture taxi (6-8 pass.)',
    'Minibus 10 passagers',
    'Minibus 14 passagers',
    'Minibus(<=11 pass)',
    'Jeep (4 pass.)',
    'Jeep(+4 pass)',
    'Camionnette(-4t)',
    'Camionnette(+=4t)',
    'Camionnette (d.cab)',
    'Bus(45 pass)',
    'Bus(15 pass)',
    'Bus(18 pass)',
    'Bus(25 pass)',
    'Bus(30 pass)',
    'Bus(35 pass)',
    'Bus(42 pass)',
    'Bus(46-60 pass)',
    'Bus(80 pass)',
    'Bus(100 pass)',
    'Camion',
    'Camion remorque',
    'Semi-remorque',
    'Remorque',
    'Tous veh. (4pass.)',
    'Tous veh. (8 pass)',
    'Tous veh.(+11 pass.)',
    'Tous veh.',
    'Non design',
    'Veh. prioritaires',
    'Engins speciaux',
    'Vehicules de sport',
    'Moto (2 Roues)',
    'Tricycle (3 roues)',
    'Taxi Moto'
  ];

  usages:string[]= [
    'Promenades et affaires',
    'Auto-ecole',
    'Transport pour compte propre',
    'Transport de carburants',
    'Transport gratuit',
    'Transport de marchandises',
    'Transport remunere de persones',
    'Location-affaires et promenade',
    'Location-transport gratuit de personnes',
    'Location-transport remunere de personnes',
    'Location-transport de choses',
    'Location-transport de carburant',
    'Garagiste (veh propre)',
    'Garagiste (en depot)',
    'Usage specifique',
    'Competition sportive',
    'Acheminement',
  ];

  @Output() body = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() primeNette = new EventEmitter<any>();

  @Input() initialValue = {};
  @Input() selectedCategory = '';
  @Input() period = '';


  constructor(
    private fb: FormBuilder,
    private policyService: PolicyService
  ) {

    this.insuranceForm = this.fb.group({
      chasis: ['', Validators.required],
      plaque: ['', Validators.required],
      limites_territoriales: ['Burundi', Validators.required],
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

    if(this.selectedCategory == 'auto'){
      this.insuranceForm.patchValue(this.initialValue);
    }
  }

  private emitFormData(): void {

    this.body.emit(this.insuranceForm.value);

    this.isFormValid.emit(
      this.insuranceForm.valid
    );
  }

  calculatePrimeNette(): void {

    if(this.insuranceForm.invalid){
      this.insuranceForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload = {
      ...this.insuranceForm.value,
      period: this.period
    };

    this.policyService.simulateTariff(payload).subscribe({

      next: (response: any) => {

        this.tariffResult = response;

        console.log("resssss", response)

        this.primeNette.emit(
          response.result?.prime_nette
        );

        this.isLoading = false;
      },

      error: (error) => {

        console.error(error);



        this.tariffResult = null;

        console.log("error,.............", error)

  this.errorTariff = error.error?.tariff || error.error?.message || 'Une erreur est survenue'
        this.isLoading = false;
      }
    });
  }
}