import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralService } from './general.service';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    AuthService,
    ApiService,
    GeneralService,
    UserService,
    ToastrService,
  ]
})
export class CoreModule { }
