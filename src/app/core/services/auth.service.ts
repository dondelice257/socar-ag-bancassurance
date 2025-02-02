import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private apiService : ApiService
) { }


login(body:any){
  const url='user/login/'

  return this.apiService.post(url, body).pipe(
    map((data) => {
        return data;
    })
);

}

signUp(body:any){
  const url='user/register/'

  return this.apiService.post(url, body).pipe(
    map((data) => {
        return data;
    })
);

}

  

}
