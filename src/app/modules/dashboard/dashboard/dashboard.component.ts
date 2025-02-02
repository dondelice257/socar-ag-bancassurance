import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import { PieChartComponent } from '../../../shared/components/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../../shared/components/charts/bar-chart/bar-chart.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    PieChartComponent,
    BarChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


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
