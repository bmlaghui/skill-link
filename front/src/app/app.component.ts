import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgChartsModule } from 'ng2-charts';
import { LinechartComponent } from './components/linechart/linechart.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProbesComponent } from './components/probes/probes.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
              CommonModule,
              RouterOutlet,
              LoginComponent,
              RegisterComponent, 
              NavigationComponent,
              FormsModule, 
              ReactiveFormsModule,
              DashboardComponent,
              NgChartsModule,
              LinechartComponent,
              ProbesComponent
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
