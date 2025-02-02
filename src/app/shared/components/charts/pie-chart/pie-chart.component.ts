import { Component, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @Input() datas: any = [];

  ngOnInit() {
      const root = am5.Root.new('chartdiv');
      const chart = root.container.children.push(
          am5percent.PieChart.new(root, {})
      );

      const series = chart.series.push(
          am5percent.PieSeries.new(root, {
              name: 'Series',
              valueField: 'value',
              categoryField: 'element',
          })
      );
      series.data.setAll(this.datas);

      // Add legend
      // let legend = chart.children.push(am5.Legend.new(root, {
      //   centerX: am5.percent(50),
      //   x: am5.percent(50),
      //   layout: root.verticalLayout
      // }));

      // legend.data.setAll(series.dataItems);
  }
}
