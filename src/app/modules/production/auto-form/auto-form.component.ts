import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auto-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './auto-form.component.html',
  styleUrl: './auto-form.component.scss'
})
export class AutoFormComponent {

  insuranceForm: FormGroup;


  marques: string[] = [
    'TOYOTA', 'VOLKSWAGEN', 'BMW', 'MERCEDES-BENZ', 'FORD', 
    'HONDA', 'CHEVROLET', 'NISSAN', 'HYUNDAI', 'AUDI', 
    'KIA', 'PEUGEOT', 'RENAULT', 'FIAT', 'JEEP', 'LAND ROVER', 
    'TESLA', 'SUBARU', 'MAZDA', 'MITSUBISHI', 'PORSCHE', 
    'JAGUAR', 'LEXUS', 'ACURA', 'INFINITI', 'MINI', 'DODGE', 
     'CHRYSLER', 'CITROËN', 'SAAB', 'ALFA ROMEO', 
    'SUZUKI', 'HONDA', 'MERCEDES', 'VOLVO'
  ];

  classes:string[]= [
    'Vehicule (4pass.)','Vehicule (+4pass.)','Voiture taxi (4 pass.)','Voiture taxi (6-8 pass.)','Minibus 10 passagers','Minibus 14 passagers', 'Minibus(<=11 pass)','Jeep (4 pass.)','Jeep(+4 pass)','Camionnette(-4t)','Camionnette(+=4t)','Camionnette (d.cab)','Bus(45 pass)','Bus(15 pass)','Bus(18 pass)','Bus(25 pass)','Bus(30 pass)','Bus(35 pass)','Bus(42 pass)','Bus(46-60 pass)','Bus(80 pass)','Bus(100 pass)','Camion','Camion remorque','Semi-remorque','Remorque','Tous veh. (4pass.)','Tous veh. (8 pass)','Tous veh.(+11 pass.)', 'Tous veh.', 'Non design', 'Veh. prioritaires', 'Engins speciaux', 'Vehicules de sport', 'Moto (2 Roues)', 'Tricycle (3 roues)', 'Taxi Moto'
  ]

  usages:string[]= [
    'Promenades et affaires','Auto-ecole','Transport pour compte propre','Transport de carburants','Transport gratuit','Transport de marchandises','Transport remunere de persones','Location-affaires et promenade','Location-transport gratuit de personnes','Location-transport remunere de personnes','Location-transport de choses', 'Location-transport de carburant','Garagiste (veh propre)','Garagiste (en depot)','Usage specifique','Competition sportive','Acheminement',
  ]

  @Output() body = new EventEmitter<{}>();
  @Output() isFormValid = new EventEmitter<boolean>();
  @Input() initialValue = {};
  @Input() selectedCategory = '';



  constructor(private fb: FormBuilder) {
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

  if(this.selectedCategory=='auto'){
    this.insuranceForm.patchValue(this.initialValue)
  }

}

private emitFormData(): void {

  const body = this.insuranceForm.value
  this.body.emit(body);
  this.isFormValid.emit(this.insuranceForm.valid);
}
}
  