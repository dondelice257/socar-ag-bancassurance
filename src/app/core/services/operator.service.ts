import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { AuthState } from '../../shared/states/auth/auth.state';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  token:string=''
  token$:Observable<string> | any

constructor(
  private apiService : ApiService,
  private store : Store,
  private httpClient: HttpClient
) { 
  this.token$=store.select(AuthState.token)

  this.token$.subscribe((token:string)=>{
    this.token=token
  })
}




  getOperatorDetails(connectedOperator:string){
    const url=`${environment.apiUrl}operator/list/${connectedOperator}`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.get(url, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  getRolesList(){
    const url=`${environment.apiUrl}operator/role`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.get(url, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  getMenusList(){
    const url=`${environment.apiUrl}operator/menu`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.get(url, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  getOperatorsList(){
    const url=`${environment.apiUrl}operator/list`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.get(url, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }
}
