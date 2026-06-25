import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { AuthState } from '../../shared/states/auth/auth.state';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  token$:any
  token:any


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



  getPoliciesList(){
    const url=`${environment.apiUrl}policy/policies/`
  
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

  getGuaranteeTemplates(category:string){
    const url=`${environment.apiUrl}policy/guarantee-template/?category=${category}`
  
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




  getPolicyDetails(policyId:string){
    const url=`${environment.apiUrl}policy/policies/${policyId}/`
  
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

  createPolicy(body:any){
    const url=`${environment.apiUrl}policy/policies/`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  createSpecificInsurance(body:any, category:string){

    const url=`${environment.apiUrl}policy/${category}-insurance/`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  createGuarantee(body:any){
    const url=`${environment.apiUrl}policy/guarantee/`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  createMember(body:any){
    const url=`${environment.apiUrl}policy/member/`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  createGoods(body:any){
    const url=`${environment.apiUrl}policy/goods/`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }







  doPolicyAction(policyId:string, action:string,body?:any){
    const url=`${environment.apiUrl}policy/policies/${policyId}/${action}/`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  doPolicyActionForOnlyRenew(policyId:string, action:string,body?:any){
    const url=`${environment.apiUrl}policy/policy/search/${policyId}/${action}/`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
        })
  );
    
  }


  sendHqNotification(body:any){
    const url=`${environment.apiUrl}notification/notify-hq/`
  
    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }


markVignetteUsed(vignetteId: string) {
  const url = `${environment.apiUrl}policy/vignette/${vignetteId}/mark_printed/`  // ← Added =
  const header = {
    'content-type': 'application/json',
    'Authorization': `Token ${this.token}`
  }
  return this.httpClient.post(url, {}, { headers: header }).pipe(  // ← Added empty body {}
    map((data) => {
      return data;
    })
  );
}


  createVignette(body:any){
    const url=`${environment.apiUrl}policy/vignette/bulk_create/`

    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }

  simulateTariff(body:any){
    const url=`${environment.apiUrl}policy/tariff/simulate/`

    const header={
      'content-type': 'application/json',
      'Authorization' : `Token ${this.token}`
  
    }
  
    return this.httpClient.post(url, body, {headers:header}).pipe(
      map((data) => {
          return data;
      })
  );
    
  }
}
