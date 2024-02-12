import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, computed, effect, input } from '@angular/core';
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
  chartData = input.required<any>()
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
  
  ngOnInit(): void {
    effect(() => {
      console.log(this.chartData());
    });
    throw new Error('Method not implemented.');
  }
  
  public pieChartLabels: string[] = [];
  public pieChartDatasets: { data: any[] }[] = [];
  public pieChartLegend: boolean = true;
  public pieChartPlugins: any[] = [];


 
  

  
}

