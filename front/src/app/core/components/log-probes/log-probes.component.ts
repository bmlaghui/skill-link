import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-probes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-probes.component.html',
  styleUrl: './log-probes.component.scss'
})
export class LogProbesComponent implements OnInit{

  constructor(private dashboardService: DashboardService) {
  }

  logs: any = [];

  @Input() chartName: string | undefined;
  ngOnInit() {
    this.dashboardService.getLogProbes().subscribe((log_probes) => {
      if (Array.isArray(log_probes)) {
        this.logs = log_probes;

        console.log("Log probes = ",this.logs)
      } else if (typeof log_probes === 'object') {
        // Si log_probes est un objet, itérer sur ses clés
        this.logs = Object.keys(log_probes).map(key => log_probes[key]);
        console.log("Log probes 2 = ",this.logs)
      } else {
        console.error('Unexpected type for log_probes:', typeof log_probes);
      }
    });
  }
  


}
