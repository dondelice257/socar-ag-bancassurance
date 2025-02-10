import { Component } from '@angular/core';
import { AgencyService } from '../../../core/services/agency.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agencies-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],
  templateUrl: './agencies-list.component.html',
  styleUrl: './agencies-list.component.scss'
})
export class AgenciesListComponent {
  tableColumns = [
    { columnDef: 'name', header: 'Nom' },
    { columnDef: 'company_name', header: 'Compagnie' },
    { columnDef: 'total_operators', header: 'No des operateurs' },
    { columnDef: 'location', header: 'Addresse' }
  ];
  
  tableData:any


  constructor(
    private agencyService : AgencyService
  ){

  }


  ngOnInit(){
    this.getAgencies()
  }

  getAgencies(){
    this.agencyService.getAgenciesList().subscribe((data:any)=>{
      this.tableData = data
    })
  }
}
