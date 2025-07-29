import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../../shared/states/auth/auth.state';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  token:string=''
  token$:Observable<string> | any
  private searchQuerySubject = new Subject<string>();
  private cancelPreviousRequest$ = new Subject<void>();
  private inputChanged$ = new Subject<string>();

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
DoAutocomplete(url: string, search: any): Observable<any> {
  this.inputChanged$.next(search);

  return this.inputChanged$.pipe(
    debounceTime(300), // Optional: To prevent too many requests
    switchMap((newSearch) => {
      this.cancelPreviousRequest$.next(); // Cancel any ongoing request

      // Ensuring that the search is appended as a query parameter
      const searchUrl = `${url}/autocomplete/?query=${encodeURIComponent(newSearch)}`;
      
      return this.apiService
        .get(searchUrl) // Make the GET request to the modified URL
        .pipe(takeUntil(this.cancelPreviousRequest$));
    })
  );
}

// Lookup method (returns a single object based on the search term)
DoLookup(url: string, search: string = ''): Observable<any> {
  const lookupUrl = `${environment.apiUrl}${url}/lookup/?query=${encodeURIComponent(search)}`;

  const header={
    'content-type': 'application/json',
    'Authorization' : `Token ${this.token}`

  }

  return this.httpClient.get(lookupUrl, {headers:header}).pipe(
    map((data) => {
      // Optionally process data if necessary
      return data;
    })
  );
}

GetList(url: string, query: string, date_from: string, date_to: string, agency_id: string): Observable<any> {
  const lookupUrl = `${environment.apiUrl}${url}&query=${encodeURIComponent(query)}&date_from=${encodeURIComponent(date_from)}&date_to=${encodeURIComponent(date_to)}&agency=${encodeURIComponent(agency_id)}`;
  const header={
    'content-type': 'application/json',
    'Authorization' : `Token ${this.token}`

  }
  return this.httpClient.get(lookupUrl, {headers:header}).pipe(
    map((data) => {
        return data;
    })
);
}










Update(url: string, id: string, body: any, ): Observable<any> {
  const lookupUrl = `${environment.apiUrl}${url}/${id}/`;
  const header={
    'content-type': 'application/json',
    'Authorization' : `Token ${this.token}`

  }
  return this.httpClient.patch(lookupUrl, body, {headers:header}).pipe(
    map((data) => {
        return data;
    })
);
}

GetAgencies(): Observable<any> {
  const url = `${environment.apiUrl}agency`;
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
