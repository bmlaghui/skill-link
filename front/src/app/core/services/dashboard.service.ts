import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Task } from '../interfaces/task.interface';
import { LogProbes } from '../interfaces/logprobes.interface';
import { AlertsFlow } from '../interfaces/alertsflow.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}


  getTasks() {
    return this.http.get<Task[]>(environment.apiUrl+'/dashboard_tasks?plageTime=WEEK');
  }

  getLogProbes() {
    return this.http.get<any[]>(environment.apiUrl+'/dashboard_probes');
  }

  getChartData(time:string, chartName:string){
    let path:string="";
    let response:Observable<Response>;
    switch(chartName) {
      case "Alerts Flows": path="dashboard_flows"; break;
      case "Alerts UseCase": path="dashboard_usecase"; break;
      case "Alerts Files": path="dashboard_yara"; break;
      case "Uploaded Files": path="dashboard_files_uploaded"; break;
      case "Exported Files": path="dashboard_files_exported"; break;

    }
    response = this.http.get<any>(environment.apiUrl+'/'+path+'?plageTime='+time);
    return response;
  }





  




}
