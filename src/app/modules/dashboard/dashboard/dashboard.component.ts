import { Component, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import { PieChartComponent } from '../../../shared/components/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../../shared/components/charts/bar-chart/bar-chart.component';
import { RouterModule } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ListComponent } from '../../../shared/components/reusable/list/list.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    PieChartComponent,
    BarChartComponent,
    RouterModule,
    MatTableModule, 
    MatPaginatorModule,
    ListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tableColumns = [
    { columnDef: 'position', header: 'No.' },
    { columnDef: 'name', header: 'Name' },
    { columnDef: 'weight', header: 'Weight' },
    { columnDef: 'symbol', header: 'Symbol' }
  ];
  
  tableData = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' }
  ];

  ngAfterViewInit() {
  }

    // Chart 1: Evolution of Transactions
    transactionEvolutionData = [
      {
        name: 'Transactions',
        series: [
          { name: 'Jan', value: 100 },
          { name: 'Feb', value: 150 },
          { name: 'Mar', value: 200 },
          { name: 'Apr', value: 250 },
          { name: 'May', value: 300 },
        ]
      }
    ];
  
    // Chart 2: Comparison of Transaction Types
    transactionTypeData = [
      { name: 'Premium Payments', value: 500 },
      { name: 'Claim Payouts', value: 300 },
      { name: 'Refunds', value: 100 },
    ];



    datas: any[] = [
      {
          element: 'Deposits',
          value: 123,
      },
      {
          element: 'Withdraws',
          value: 774,
      },
      {
          element: 'Transfers',
          value: 892,
      },
  ];

  datasBar = [
    { month: 'January', total: 1000 },
    { month: 'February', total: 1500 },
    { month: 'March', total: 1200 },
    { month: 'April', total: 1800 },
    { month: 'May', total: 1600 },
    { month: 'June', total: 2000 },
  ];
}


