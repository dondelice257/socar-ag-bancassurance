import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],  
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  tableColumns = [
    { columnDef: 'username', header: 'Nom d utiisateur' },
    { columnDef: 'email', header: 'Email' },
    { columnDef: 'first_name', header: 'Prenom' },
    { columnDef: 'last_name', header: 'Nom' },
    { columnDef: 'phone_number', header: 'Numero de telephone' },
    { columnDef: 'country', header: 'Pays d origine' },
    { columnDef: 'is_client', header: 'Client' },
    { columnDef: 'is_operator', header: 'Operateur' },








  ];
  
  tableData:any


  constructor(
    private userService : UserService
  ){

  }


  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsersList().subscribe((data:any)=>{
      this.tableData = data
    })
  }
}
