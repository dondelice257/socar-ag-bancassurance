import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

constructor() { }

otp$= new BehaviorSubject('')
campaignId$=new BehaviorSubject('')

getOtp(value:any){
  this.otp$.next(value)
}

getCampaignId(value:any){
  this.campaignId$.next(value)
}

}
