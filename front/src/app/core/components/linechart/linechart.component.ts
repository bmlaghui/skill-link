import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import jsPDF from 'jspdf';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [NgChartsModule, HttpClientModule, CommonModule],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss'
})
export class LinechartComponent {
  @Input() chartData: any; // Define an input property named chartData
  public lineChartTitle: string = 'Line-Chart';

  @Input() chartName!:string ;
  
  @Output() chartDataTime: EventEmitter<string> = new EventEmitter<string>(
    );
 

  isHourButtonActive: boolean = false;
  isDayButtonActive: boolean = false;
  isWeekButtonActive: boolean = false;
  
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;
  
    public lineChartData: ChartData<'line'> = {
      labels: [],
      datasets: []
    };


  constructor(private dashboardService: DashboardService) {
    
  }

  ngOnInit() {
    this.getData('hour');
  }

  getData(chartDataTime: string) {
    try {
      this.dashboardService.getChartData(chartDataTime.toUpperCase(), this.chartName).subscribe((apiData: any) => {
        
        // Reformatting data
        const formattedData: any = {
          labels: Object.keys(apiData),
          datasets: [{
            data: Object.values(apiData).map((item: any) => item.nbEvents),
            fill: true,
            tension: 0.5,
            borderColor: "black",
            backgroundColor: "#f2d000",
            label: "number of events"
          }]
        };
  
        console.log('Formatted Data:', formattedData);
  
        this.lineChartData = formattedData;
  
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
  
  saveAsPng() {
    const canvas = document.querySelector('#Line-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'linechart.png';
    link.href = img;
    link.click();
  }

  saveAsJpg() {
    const canvas = document.querySelector('#Line-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.download = 'linechart.jpg';
    link.href = img;
    link.click();
  }

  saveAsPdf() {
    const canvas = document.querySelector('#Line-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/jpeg');
    const pdf = new jsPDF();
    pdf.addImage(img, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save('linechart.pdf');
  }

  saveAsSvg() {
    const canvas = document.querySelector('#Line-Chart') as HTMLCanvasElement;
    const img = canvas.toDataURL('image/svg+xml');
    const link = document.createElement('a');
    link.download = 'linechart.svg';
    link.href = img;
    link.click();
  }

  saveAsCsv() {
  
  }



  
}





