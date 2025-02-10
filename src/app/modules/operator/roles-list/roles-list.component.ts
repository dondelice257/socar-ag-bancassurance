import { Component } from '@angular/core';
import { OperatorService } from '../../../core/services/operator.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RolesListComponent {

  tableColumns = [
    { columnDef: 'id', header: 'Code' },
    { columnDef: 'name', header: 'Nom' },
  ];
  
  tableData:any


  constructor(
    private operatorService : OperatorService
  ){

  }


  ngOnInit(){
    this.getRoles()
  }

  getRoles(){
    this.operatorService.getRolesList().subscribe((data:any)=>{
      this.tableData = data
    })
  }
}
