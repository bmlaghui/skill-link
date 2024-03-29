import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, effect, input } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent {

  chartData = input.required<any>()
  @Input() chartName!: string;

  constructor(){
    effect(() => {
      this.barChartData.labels = this.chartData().map((data: any) => data.month);
      this.barChartData.datasets = [
          { label: 'admin', data: this.chartData().map((data: any) => data.admin) },
          { label: 'recruiter', data: this.chartData().map((data: any) => data.entreprise) },
          { label: 'candidate', data: this.chartData().map((data: any) => data.candidat) }

        ];
        console.log(this.chartData())
    });

  }

 

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
    // Add other chart options as needed
  };
}

