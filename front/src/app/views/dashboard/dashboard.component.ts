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

  actualTemperature = toSignal(this.weatherService.getActualTemperature('Paris'), { initialValue: 
    {
      "coord": {
        "lon": null,
        "lat": null
      },
      "weather": [
        {
          "id": null,
          "main": null,
          "description": null,
          "icon": null
        }
      ],
      "base": null,
      "main": {
        "temp": null,
        "feels_like": null,
        "temp_min": null,
        "temp_max": null,
        "pressure": null,
        "humidity": null
      },
      "visibility": null,
      "wind": {
        "speed": null,
        "deg": null
      },
      "clouds": {
        "all": null
      },
      "dt": null,
      "sys": {
        "type": null,
        "id": null,
        "country": null,
        "sunrise": null,
        "sunset": null
      },
      "timezone": null,
      "id": null,
      "name": null,
      "cod": null
    } });

  actualUser = toSignal(this.authService.connectedUser(), { initialValue: {
    "languages": [],
    "interests": [],
    "firstName": null,
    "lastName": null,
    "email": null,
    "username": null,
    "phoneNumber": null,
    "role": null,
    "address": null,
    "description": null,
    "linkLinkedin": null,
    "linkGithub": null,
    "linkWebsite": null,
    "linkCV": null,
    "image": null,
    "skills": [],
    "verified": null,
    "notifications": [],
    "experiences": [],
    "diplomas": [],
    "missions": [],
    "applications": [],
    "createdAt": null,
    "updatedAt": null
  }  }); 

}
