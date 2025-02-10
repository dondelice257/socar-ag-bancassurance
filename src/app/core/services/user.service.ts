import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../shared/states/auth/auth.state';
import {environment} from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

getConnectedUserInfo(){
  const url=`${environment.apiUrl}user/profile`

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


getUsersList(){
  const url=`${environment.apiUrl}user/list`

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

getClientsList(){
  const url=`${environment.apiUrl}client`

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




getConnectedOperator(connectedUser:string){
  const url=`${environment.apiUrl}operator/list/?user=${connectedUser}`

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
