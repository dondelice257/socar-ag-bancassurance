import { Component } from '@angular/core';
import { LookupComponent } from '../../../shared/components/reusable/lookup/lookup.component';

@Component({
  selector: 'app-client-search',
  standalone: true,
  imports: [
    LookupComponent
  ],
  templateUrl: './client-search.component.html',
  styleUrl: './client-search.component.scss'
})
export class ClientSearchComponent {

  onUserSelected(user: any) {
    console.log('Selected User:', user);
  }
  

}
