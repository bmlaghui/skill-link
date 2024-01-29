import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import jsPDF from 'jspdf';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-donughtchart',
  standalone: true,
  imports: [NgChartsModule, CommonModule, HttpClientModule],
  templateUrl: './donughtchart.component.html',
  styleUrl: './donughtchart.component.scss'
})
export class DonughtchartComponent implements OnInit {
  
  isHourButtonActive: boolean = false;
  isDayButtonActive: boolean = false;
  isWeekButtonActive: boolean = false;
  @Input() chartData: any; // Define an input property named chartData
  @Input() chartName!:string ;
  
  @Output() chartDataTime: EventEmitter<string> = new EventEmitter<string>(
    );

  

  public doughnutChartTitle: string = 'Doughnut-Chart';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [

  ];


  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Display the legend
        position: 'bottom', // or 'bottom', 'left', 'right'
        align: 'center', // or 'start', 'end'
        labels: {
          boxWidth: 20, // Width of the colored box in the legend
          padding: 5, // Padding between legend elements
          usePointStyle: false, // Use a circular point style in the legend
        }
      }
    }

  };

  constructor() {
  }

  ngOnInit() {
    this.getLastHourData();
  }

  async getLastHourData() {
    try {
      const response = await fetch('./assets/datasets/charts/donut-chart/hour.json');
      const data = await response.json();
  
      const datasets = Object.keys(data['data']).map((key, index) => {
        return {
          data: data['data'][key],
          label: key
        };
      });
  
      this.doughnutChartLabels = data['labels'];
      
  
      const newData: ChartData<'doughnut'> = {
        labels: data['labels'],
        datasets: datasets,
      };
  
      this.doughnutChartData = newData;
      this.doughnutChartDatasets = datasets;
    
      // Set the active class state
      this.isHourButtonActive = true;
      this.isDayButtonActive = false;
      this.isWeekButtonActive = false;
  
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

  async getLastDayData() {
    try {
      const response = await fetch('./assets/datasets/charts/donut-chart/day.json');
      const data = await response.json();
      const datasets = Object.keys(data['data']).map((key, index) => {
        return {
          data: data['data'][key],
          label: key
        };
      });
  
      this.doughnutChartLabels = data['labels'];
      
  
      const newData: ChartData<'doughnut'> = {
        labels: data['labels'],
        datasets: datasets,
      };
  
      this.doughnutChartData = newData;
      this.doughnutChartDatasets = datasets;


    
      // Set the active class state
      this.isHourButtonActive = true;
      this.isDayButtonActive = false;
      this.isWeekButtonActive = false;
  
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  } 

  async getLastWeekData() {
    try {
      const response = await fetch('./assets/datasets/charts/donut-chart/week.json');
      const data = await response.json();
  
     
      const datasets = Object.keys(data['data']).map((key, index) => {
        return {
          data: data['data'][key],
          label: key
        };
      });
  
      this.doughnutChartLabels = data['labels'];
      
  
      const newData: ChartData<'doughnut'> = {
        labels: data['labels'],
        datasets: datasets,
      };
  
      this.doughnutChartData = newData;
      this.doughnutChartDatasets = datasets;


    
      // Set the active class state
      this.isHourButtonActive = true;
      this.isDayButtonActive = false;
      this.isWeekButtonActive = false;
  
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }
  
  saveAsPng() {
    const canvas = document.querySelector('#Doughnut-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'donughtchart.png';
    link.href = img;
    link.click();
  }

  saveAsJpg() {
    const canvas = document.querySelector('#Doughnut-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.download = 'donughtchart.jpg';
    link.href = img;
    link.click();
  }

  saveAsPdf() {
    const canvas = document.querySelector('#Doughnut-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/png');
    const doc = new jsPDF();
    doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    doc.save('donughtchart.pdf');
  }

  saveAsSvg() {
    const canvas = document.querySelector('#Doughnut-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/svg+xml');
    const link = document.createElement('a');
    link.download = 'donughtchart.svg';
    link.href = img;
    link.click();
  }

  public donughtchartData: ChartConfiguration<'bar'>['data']['datasets'] = [
    { data: [ 350, 450, 100 ], label: 'Series A' },
    { data: [ 50, 150, 120 ], label: 'Series B' },
    { data: [ 250, 130, 70 ], label: 'Series C' }
  ];
  saveAsCsv() {
    const csv = [
      [ 'data1', 'data2', 'data3' ],
      [ 'data4', 'data5', 'data6' ],
      [ 'data7', 'data8', 'data9' ]
    ];
    const link = document.createElement('a');
    link.download = 'donughtchart.csv';
    link.href = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    link.click();
  }

}
