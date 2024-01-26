import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { Task } from '../../core/interfaces/task.interface';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  @Input() chartName!:string;
  tasks: Task[] = [];
  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dashboardService.getTasks().subscribe((newTasks) => {
      if (Array.isArray(newTasks)) {
        this.tasks = newTasks;
      } else if (typeof newTasks === 'object') {
        // Si newTasks est un objet, itérer sur ses clés
        this.tasks = Object.keys(newTasks).map(key => newTasks[key]);
      } else {
        console.error('Unexpected type for newTasks:', typeof newTasks);
      }
    });
  }
  
  

}
