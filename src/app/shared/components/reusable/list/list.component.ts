import {AfterViewInit, Component, ViewChild} from '@angular/core';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-list',
  styleUrl: 'list.component.scss',
  templateUrl: 'list.component.html',
  standalone: true,
  imports: [],
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];


  ngAfterViewInit() {
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
