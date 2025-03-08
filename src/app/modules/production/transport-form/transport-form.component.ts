import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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

  packaging=['CONT01-Hors container', 'CONT02-En container']
  emballages =['PCK01-Caisse', 'PCK02-Balles','PCK05-Sacs','PCK06-Vracs','PCK07-Cartons','PCK08-Futs metalliques','PCK09-Futs plastiques',]
  transportModes=['BATEAU/CAMION', 'AVION','CAMION','CAMION:ACCIDENTS CARACTERISES']
  @Output() body = new EventEmitter<{}>();
  @Output() isFormValid = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
  this.insuranceForm = this.fb.group({
    nature_marchandise: ['', Validators.required],
    description: ['', Validators.required],
    nature_emballage: ['', Validators.required],
    transport_mode: ['', Validators.required],

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
}

private emitFormData(): void {
  const body = this.insuranceForm.value; // Get all form values directly

  this.body.emit(body);
  this.isFormValid.emit(this.insuranceForm.valid);
}
}
