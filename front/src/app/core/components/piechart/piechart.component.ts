import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
export class PiechartComponent implements OnInit {
  public pieChartTitle: string = 'Pie-Chart';
  @Input() chartData: any; // Define an input property named chartData
  @Input() chartName:string|undefined;

  isHourButtonActive: boolean = false;
  isDayButtonActive: boolean = false;
  isWeekButtonActive: boolean = false;

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
  public pieChartDatasets: { data: number[] }[] = [{ data: [] }];
  public pieChartLegend: boolean = true;
  public pieChartPlugins: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getLastHourData();
  }

  async getLastHourData() {
    try {
      const response = await fetch('./assets/datasets/charts/pie-chart/hour.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      this.pieChartLabels = data['labels'];
      this.pieChartDatasets = [ { data: data['data'] } ];
      this.pieChartTitle = data['title'];
      this.isHourButtonActive = true;
      this.isDayButtonActive = false;
      this.isWeekButtonActive = false;


    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

  async getLastDayData() {
    try{
      const response = await fetch('./assets/datasets/charts/pie-chart/day.json');
      const data = await response.json();
      this.pieChartLabels = data['labels'];
      this.pieChartDatasets = [ { data: data['data'] } ];
      this.pieChartTitle = data['title'];
      this.isHourButtonActive = false;
      this.isDayButtonActive = true;
      this.isWeekButtonActive = false;
    }
    catch(error){
      console.log(error);
    }
  }

  async getLastWeekData() {
    try{
      const response = await fetch('./assets/datasets/charts/pie-chart/week.json');
      const data = await response.json();
      this.pieChartLabels = data['labels'];
      this.pieChartDatasets = [ { data: data['data'] } ];
      this.pieChartTitle = data['title'];
      this.isHourButtonActive = false;
      this.isDayButtonActive = false;
      this.isWeekButtonActive = true;
    }
    catch(error){
      console.log(error);
    }
  }

  
  saveAsPng() {
    const canvas = document.querySelector('#Pie-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'Piechart.png';
    link.href = img;
    link.click();
  }

  saveAsJpg() {
    const canvas = document.querySelector('#Pie-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.download = 'Piechart.jpg';
    link.href = img;
    link.click();
  }

  saveAsPdf() {
    const canvas = document.querySelector('#Pie-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/png');
    const doc = new jsPDF();
    doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    doc.save('Piechart.pdf');
  }

  saveAsSvg() {
    const canvas = document.querySelector('#Pie-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/svg+xml');
    const link = document.createElement('a');
    link.download = 'Piechart.svg';
    link.href = img;
    link.click();
  }

  saveAsCsv() {
    const csv =
      'data:text/csv;charset=utf-8,' +
      this.pieChartDatasets.map((dataset) => dataset.data.join(',')).join('\n');
    const link = document.createElement('a');
    link.download = 'Piechart.csv';
    link.href = csv;
    link.click();
  }

  




}
