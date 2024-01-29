import { Component } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { DecimalPipe } from '@angular/common'; // Import DecimalPipe



@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
  providers: [DecimalPipe] // Add DecimalPipe to the component providers
})
export class DashboardAdminComponent {
  constructor(private weatherService: WeatherService) {
  }

  public actualTemperature$ = of((273.88 - 32) / 1.8); // Wrap the value inside of() to convert it into an observable
  
  temperature = toSignal(this.actualTemperature$);

  actualTemperature = toSignal(this.weatherService.getActualTemperature('Paris'));



}


