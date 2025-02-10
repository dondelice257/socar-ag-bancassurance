import { Injectable } from '@angular/core';
import { AuthState } from '../../shared/states/auth/auth.state';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {


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
  
  
  
  
    getAgenciesList(){
      const url=`${environment.apiUrl}agency/?company=1`
    
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
