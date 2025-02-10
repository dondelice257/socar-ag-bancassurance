import { Component } from '@angular/core';
import { OperatorService } from '../../../core/services/operator.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operators-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],
  templateUrl: './operators-list.component.html',
  styleUrl: './operators-list.component.scss'
})
export class OperatorsListComponent {
  tableColumns = [
    { columnDef: 'full_name', header: 'Nom' },
    { columnDef: 'company_name', header: 'Compagnie' },

    { columnDef: 'agency_name', header: 'Agence' },
    { columnDef: 'id', header: 'Code' },


  ];
  
  tableData:any


  constructor(
    private operatorService : OperatorService
  ){

  }


  ngOnInit(){
    this.getOperators()
  }

  getOperators(){
    this.operatorService.getOperatorsList().subscribe((data:any)=>{
      this.tableData = data
    })
  }
}
