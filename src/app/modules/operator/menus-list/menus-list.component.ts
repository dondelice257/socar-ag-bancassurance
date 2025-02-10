import { Component } from '@angular/core';
import { OperatorService } from '../../../core/services/operator.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menus-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],  
  templateUrl: './menus-list.component.html',
  styleUrl: './menus-list.component.scss'
})
export class MenusListComponent {


  tableColumns = [
    { columnDef: 'name', header: 'Nom' },
    { columnDef: 'url', header: 'Lien' },

    { columnDef: 'group_name', header: 'Menu parent' },
    { columnDef: 'id', header: 'Code' },


  ];
  
  tableData:any


  constructor(
    private operatorService : OperatorService
  ){

  }


  ngOnInit(){
    this.getMenus()
  }

  getMenus(){
    this.operatorService.getMenusList().subscribe((data:any)=>{
      this.tableData = data
    })
  }
}
