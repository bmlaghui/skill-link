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
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 20,
          padding: 5,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'bold'
          },
          color: 'black',
          // generateLabels: function(chart) {
          //   const data = chart.data;
          //   if (data.labels && data.datasets) {
          //     const labels = data.labels.slice();
          //     return labels.map(function(label, index) {
          //       const dataset = data.datasets[0];
          //       const value = dataset.data[index];
          //       return {
          //         text: `${label} - ${value}`, // Display label with value
          //         index: index,
          //         datasetIndex: 0,
          //       };
          //     });
          //   }
          //   return [];
          // }
        }
      }
    }
  };
  
  
 constructor(){
    effect(() => {
      this.pieChartLabels = this.chartData().map((data: any) => data.role || data._id);
      this.pieChartDatasets = [{ data: this.chartData().map((data: any) => data.count)}];
    });
  }


  
  public pieChartLabels: string[] = [];
  public pieChartDatasets: { data: any[] }[] = [];
  public pieChartLegend: boolean = true;
  public pieChartPlugins: any[] = [];


 
  

  
}

