import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, computed } from '@angular/core';
import { ChartOptions } from 'chart.js';
import jsPDF from 'jspdf';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [NgChartsModule, CommonModule, HttpClientModule],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.scss'
})
export class PiechartComponent implements OnInit{
  public pieChartTitle: string = 'Pie-Chart';
  @Input() chartData!: any ; // Define an input property named chartData
  @Input() chartName:string|undefined;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 20,
          padding: 5,
          usePointStyle: false,
        }
      }
    }
  };

  
  public pieChartLabels: string[] = [];
  public pieChartDatasets: { data: any[] }[] = [{ data: [ this.chartData ] }];
  public pieChartLegend: boolean = true;
  public pieChartPlugins: any[] = [];
  ngOnInit() {
    console.log("MY DATAAAAAAAAA", this.chartData);
    console.log("MY NAMEEEEEEE", this.chartName);
  }

  
}
