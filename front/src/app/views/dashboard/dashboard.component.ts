import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { WeatherService } from '../../core/services/weather.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { PiechartComponent } from "../../shared/piechart/piechart.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CommonModule, PiechartComponent]
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



        dashboardService = inject(DashboardService);
        usersByType = "Users stats";
        usersDataset : any = [];
        usersByTypeData = toSignal(this.dashboardService.getUsersByroleStats(), { initialValue: [ { "role": "admin", "count": 0 }, { "role": "candidat", "count": 0 }, { "role": "entreprise", "count": 0 } ]  });

        widthSize = 200;
        heightSize = 200;
        
        /**
         * The number of candidates.
         */
        nbCandidates = computed(() => 
          {
            const filteredData = this.usersByTypeData()?.filter((role) => role.role === 'candidat');
            return filteredData?.map(role => role.count);
          }
        );
        /**
         * The number of recruiters.
         */
        nbRecruiters = computed(() => 
          {
            const filteredData = this.usersByTypeData()?.filter((role) => role.role === 'entreprise');
            return filteredData?.map(role => role.count);
          }
        );
        /**
         * The number of admins.
         */
        nbAdmins = computed(() => 
          {
            const filteredData = this.usersByTypeData()?.filter((role) => role.role === 'admin');
            return filteredData?.map(role => role.count);
          }
        );   




        


    

}
