import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/authentification/login/login.component';
import { RegisterComponent } from './views/authentification/register/register.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { SidebarComponent } from './views/layout/sidebar/sidebar.component';
import { SettingsPanelComponent } from './views/layout/settings-panel/settings-panel.component';
import { NavbarComponent } from './views/layout/navbar/navbar.component';


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
              DashboardComponent,
              FooterComponent,
              SidebarComponent,
              SettingsPanelComponent,
              NavbarComponent
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
