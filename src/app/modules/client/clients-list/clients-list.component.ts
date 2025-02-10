import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],    
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent {
  tableColumns = [
    { columnDef: 'user_full_name', header: 'Nom' },
    { columnDef: 'id', header: 'Code' },
    { columnDef: 'company_name', header: 'Compagnie' },
    { columnDef: 'user_is_operator', header: 'Operateur' },









  ];
  
  tableData:any


  constructor(
    private userService : UserService
  ){

  }


  ngOnInit(){
    this.getClients()
  }

  getClients(){
    this.userService.getClientsList().subscribe((data:any)=>{
      this.tableData = data
    })
  }
}
