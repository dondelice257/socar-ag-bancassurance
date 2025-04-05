import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transport-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './transport-form.component.html',
  styleUrl: './transport-form.component.scss'
})
export class TransportFormComponent {

  insuranceForm: FormGroup;


  natures =[
    'PRODUITS ALIMENTAIRES PERISSABLES',
    'PRODUITS ALIMENTAIRES NON PERISSABLES',
    'BOISSONS',
    'TABACS',
    'MATIERES TEXTILES ( COTONS, FILS, AUTRES...)',
    'PRODUITS TEXTILES ( VETEMENTS, CUIRS...)',
    'COIFFES ET ACCESSOIRES',
    'PRODUITS PHARMACEUTIQUES',
    'PRODUITS DE PARFUMERIES',
    'SAVONS ET LESSIVES',
    'CARBURANTS & PRODUITS PETROLIERS',
    'CERAMIQUES ET PORCELAINE',
    'VERRERIE, CRISTAUX ET LUMINAIRES',
    'APPAREILS ELECTRO-MENAGERS',
    'VOITURES ET CAMIONS',
    'ANIMAUX',

    'PIECES DE RECHANGE, VELOS ET MOTOS',
    'MACHINES A OUTILS',
    'CIMENT ET LIANT',
    'BIENS DE CONSTRUCTION FRAGILES ',
    'BIEN DE CONSTRUCTION NON FRAGILES',
    'ENGRAIS CHIMIQUES',
    'AUTRES PRODUITS CHIMIQUES',
    'PLASTIQUES',
    'FRIPPERIES',
    'AUTRES BIENS D EQUIPEMENT',
    'MINERAIS SAUF LES METAUX PRECIEUX',




  ]

  packaging=['Hors container', 'En container']
  descriptifs=['FOB', 'CIF', 'C & F']

  emballages =['Caisse', 'Balles','Sacs','Vracs','Cartons','Futs metalliques','Futs plastiques',]
  transportModes=['BATEAU/CAMION', 'AVION','CAMION','CAMION:ACCIDENTS CARACTERISES']
  @Output() body = new EventEmitter<{}>();
  @Output() isFormValid = new EventEmitter<boolean>();
  @Input() initialValue = {};
  @Input() selectedCategory = '';


  constructor(private fb: FormBuilder) {
  this.insuranceForm = this.fb.group({
    nature_marchandise: ['', Validators.required],
    description: ['', Validators.required],
    nature_emballage: ['', Validators.required],
    transport_type: ['', Validators.required],
    descriptif_marchandise: ['', Validators.required],
    packaging: ['', Validators.required],

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

  if(this.selectedCategory=='transport'){
    this.insuranceForm.patchValue(this.initialValue)
  }
}

private emitFormData(): void {
  const body = this.insuranceForm.value; // Get all form values directly

  this.body.emit(body);
  this.isFormValid.emit(this.insuranceForm.valid);
}
}
