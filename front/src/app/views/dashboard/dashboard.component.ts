import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private weatherService: WeatherService) {
  }

  public actualTemperature$ = of((273.88 - 32) / 1.8); // Wrap the value inside of() to convert it into an observable
  
  temperature = toSignal(this.actualTemperature$);

  actualTemperature = toSignal(this.weatherService.getActualTemperature('Paris'));

}
