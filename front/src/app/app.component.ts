import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { IdleService } from './core/services/idle.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


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
              NavbarComponent,
              TagInputModule,
              TranslateModule
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Skills Link';
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang("en");
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }
  
}
