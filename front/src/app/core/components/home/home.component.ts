import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { LinechartComponent } from '../linechart/linechart.component';
import { PiechartComponent } from '../piechart/piechart.component';
import { DonughtchartComponent } from '../donughtchart/donughtchart.component';
import { BarchartComponent } from '../barchart/barchart.component';
import { ProbesGraphComponent } from '../probes-graph/probes-graph.component';
import { LogProbesComponent } from '../log-probes/log-probes.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { TasksComponent } from '../tasks/tasks.component';
import { AlertsFlow } from '../../core/interfaces/alertsflow.interface';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LinechartComponent, PiechartComponent, DonughtchartComponent, BarchartComponent, ProbesGraphComponent, LogProbesComponent, TasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  alertsFlowDataHour: AlertsFlow[] = [];
  alertsFlowDataDay: AlertsFlow[] = [];
  alertsFlowDataWeek: AlertsFlow[]=[];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
  }


  alertUseCaseName = "Alerts UseCase"
  alertFilesName = "Alerts Files"
  alertFlowsName = "Alerts Flows"
  filesUploadedName = "Uploaded Files"
  filesExportedName = "Exported Files"
  logProbesName = "Log Probes"
  probesName = "Probes"
  alertsFlowName = "alertsFlowData"
  tasksName = "Tasks"

  alertUseCaseData = {}
  alertFilesData = {}
  filesUploadedData = {}
  filesExportedData = {}
  logProbesData = {}
  probesData = {}
  alertFlowsData = {}

  
 
generatePDF() {
      const doc = new jsPDF();
      const margins = {
        top: 30,
        bottom: 30,
        left: 10,
        right: 10
      }
      doc.setFontSize(12);
      doc.save('a4.pdf');
  }

   changeWidgetsOrder(nb: number) {
    const grahsDiv = document.querySelector('.graphs');

    if (grahsDiv instanceof HTMLElement) {
        grahsDiv.style.gridTemplateColumns = `repeat(${nb}, 1fr)`;
    } else {
        console.error('Element with class "grahs" not found.');
    }
}

  
}

