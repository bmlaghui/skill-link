import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { WeatherService } from '../../core/services/weather.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private weatherService = inject(WeatherService);
  private authService = inject(AuthService);

  actualTemperature = toSignal(this.weatherService.getActualTemperature('Paris'));

  actualUser = toSignal(this.authService.connectedUser()); 

}
