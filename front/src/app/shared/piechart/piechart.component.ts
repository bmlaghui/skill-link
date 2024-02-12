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
export class PiechartComponent{
  public pieChartTitle: string = 'Pie-Chart';
  chartData = input.required<any>()
  @Input() chartName:string|undefined;
  @Input()widthSize!:number;
  @Input()heightSize!:number;
  
  
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
  
 constructor(){
    effect(() => {
      console.log("Test" ,this.chartData());
      this.pieChartLabels = this.chartData().map((data: any) => data.role);
      this.pieChartDatasets = [{ data: this.chartData().map((data: any) => data.count) }];

    });
  }


  
  public pieChartLabels: string[] = [];
  public pieChartDatasets: { data: any[] }[] = [];
  public pieChartLegend: boolean = true;
  public pieChartPlugins: any[] = [];


 
  

  
}

