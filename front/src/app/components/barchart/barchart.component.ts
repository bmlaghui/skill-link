import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import jsPDF from 'jspdf';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../services/dashboard.service';
import { ApiBarChartResponse } from '../../interfaces/ApiBarChartResponse.interface';
import { FormattedBarChartInterface } from '../../interfaces/formatted-bar-chart.interface';


@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

  constructor(  private dashboardService: DashboardService
    ) {}

  isHourButtonActive: boolean = false;
  isDayButtonActive: boolean = false;
  isWeekButtonActive: boolean = false;
  
  @Output() chartDataTime: EventEmitter<string> = new EventEmitter<string>(
  );

  @Input() chartName!:string;

  
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
    // Add other chart options as needed
  };

  getData(chartDataTime: string) {
    try {
      this.dashboardService.getChartData(chartDataTime.toUpperCase(), this.chartName).subscribe((apiData: any) => {
  
        // Reformatting data
        const formattedData: any = {
          labels: Object.keys(apiData),
          data: {}
        };
  
        for (const key in apiData) {
          if (apiData.hasOwnProperty(key)) {
            for (const severityKey in apiData[key]) {
              if (apiData[key].hasOwnProperty(severityKey)) {
                if (!formattedData.data[severityKey]) {
                  formattedData.data[severityKey] = [];
                }
                formattedData.data[severityKey].push(apiData[key][severityKey]);
              }
            }
          }
        }
  
        const datasets = Object.keys(formattedData.data).map((key, index) => {
          const backgroundColors = [
            '#f44949',
            '#ff6633',
            '#f89200',
            '#ffdc00'
            // Add more colors as needed
          ];
  
          return {
            data: formattedData.data[key],
            label: `Sev ${index + 1}`, // Assuming severity starts from 1
            borderColor: 'black',
            backgroundColor: backgroundColors[index % backgroundColors.length] // Cycle through colors
          };
        });
  
        const newData: ChartData<'bar'> = {
          labels: formattedData.labels,
          datasets: datasets
        };
  
        this.barChartData = newData;
    
        // Set the active class state
        switch (chartDataTime) {
          case 'hour':
            this.isHourButtonActive = true;
            this.isDayButtonActive = false;
            this.isWeekButtonActive = false;
            break;
          case 'day':
            this.isHourButtonActive = false;
            this.isDayButtonActive = true;
            this.isWeekButtonActive = false;
            break;
          case 'week':
            this.isHourButtonActive = false;
            this.isDayButtonActive = false;
            this.isWeekButtonActive = true;
            break;
        }
      });
  
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    this.getData('hour');
  }

  saveAsPng() {
    const canvas = document.querySelector('#Bar-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'barchart.png';
    link.href = img;
    link.click();
  }

  saveAsJpg() {
    const canvas = document.querySelector('#Bar-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.download = 'barchart.jpg';
    link.href = img;
    link.click();
  }

  saveAsPdf() {
    const canvas = document.querySelector('#Bar-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/png');
    const doc = new jsPDF();
    doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    doc.save('barchart.pdf');
  }

  saveAsSvg() {
    const canvas = document.querySelector('#Bar-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/svg+xml');
    const link = document.createElement('a');
    link.download = 'barchart.svg';
    link.href = img;
    link.click();
  }

  saveAsCsv() {
    const csv =
      'data:text/csv;charset=utf-8,' +
      this.barChartData.datasets.map((dataset) => dataset.data.join(',')).join('\n');
    const link = document.createElement('a');
    link.download = 'barchart.csv';
    link.href = csv;
    link.click();
  }
}