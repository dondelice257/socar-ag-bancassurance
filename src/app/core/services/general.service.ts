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
  const lookupUrl = `${url}/lookup/?query=${encodeURIComponent(search)}`;

  return this.apiService.get(lookupUrl).pipe(
    map((data) => {
      // Optionally process data if necessary
      return data;
    })
  );
}



}
