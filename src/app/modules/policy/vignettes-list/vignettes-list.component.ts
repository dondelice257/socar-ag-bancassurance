import { Component } from '@angular/core';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';

@Component({
  selector: 'app-vignettes-list',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './vignettes-list.component.html',
  styleUrl: './vignettes-list.component.scss'
})
export class VignettesListComponent {

  tableColumns = [
    { columnDef: 'code', header: 'Code' },
    { columnDef: 'is_used', header: 'Imprime' }, 
    { columnDef: 'issue_date', header: 'Date de sortie' },
    { columnDef: 'agency_data.name', header: 'Agence' },
    { columnDef: 'agency_data.sub_agency', header: 'S. Agence' },
  ];
  
}
