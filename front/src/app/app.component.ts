import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginComponent } from './core/components/authentification/login/login.component';
import { RegisterComponent } from './core/components/authentification/register/register.component';
import { LayoutComponent } from './core/layout/layout.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
              CommonModule,
              RouterOutlet,
              LoginComponent,
              RegisterComponent, 
              FormsModule, 
              ReactiveFormsModule,
              NgChartsModule,
              LayoutComponent
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
