import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { findIndex, map, of } from 'rxjs';
import { WeatherService } from '../../core/services/weather.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { PiechartComponent } from "../../shared/piechart/piechart.component";
import { BarchartComponent } from '../../shared/barchart/barchart.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CommonModule, PiechartComponent, BarchartComponent]
})
export class DashboardComponent {

  private weatherService = inject(WeatherService);
  
  private authService = inject(AuthService);

  // actualTemperature = toSignal(this.weatherService.getActualTemperature('Paris'), { initialValue: 
  //   {
  //     "coord": {
  //       "lon": null,
  //       "lat": null
  //     },
  //     "weather": [
  //       {
  //         "id": null,
  //         "main": null,
  //         "description": null,
  //         "icon": null
  //       }
  //     ],
  //     "base": null,
  //     "main": {
  //       "temp": null,
  //       "feels_like": null,
  //       "temp_min": null,
  //       "temp_max": null,
  //       "pressure": null,
  //       "humidity": null
  //     },
  //     "visibility": null,
  //     "wind": {
  //       "speed": null,
  //       "deg": null
  //     },
  //     "clouds": {
  //       "all": null
  //     },
  //     "dt": null,
  //     "sys": {
  //       "type": null,
  //       "id": null,
  //       "country": null,
  //       "sunrise": null,
  //       "sunset": null
  //     },
  //     "timezone": null,
  //     "id": null,
  //     "name": null,
  //     "cod": null
  //   } });

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


        barChartName = "candidates"
        dashboardService = inject(DashboardService);
        usersByType = "Users stats";
        usersDataset : any = [];
        usersByTypeData = toSignal(this.dashboardService.getUsersByroleStats(), { initialValue: [ { "role": "admin", "count": 0 }, { "role": "candidat", "count": 0 }, { "role": "entreprise", "count": 0 } ]  });
        entreprisesByCategory = toSignal(this.dashboardService.getEntreprisesByCategoryStats(), { initialValue: [{}] } );
        missionsByCategory = toSignal(this.dashboardService.getMissionsByCategoryStats(), { initialValue: [{}] } );
        applicationsByStatus = toSignal(this.dashboardService.getApplicationsByStatusStats(), { initialValue: [{}] } );

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
        
        /**
         * The number of companies.
         */
        nbCompanies = computed(() => 
          {
            const filteredData = this.entreprisesByCategory()?.filter((category) => category.category === 'company');
            return filteredData?.length;
          }
        );
        /**
         * The number of startups.
         */
        nbStartups = computed(() => 
          {
            const filteredData = this.entreprisesByCategory()?.filter((category) => category.category === 'startup');
            return filteredData?.length;
          }
        );

        /**
         * The number of missions.
         */
        nbMissions = computed(() => {
          const missionsByCategory = this.missionsByCategory(); // Assuming missionsByCategory is a method that returns an array of categories
        
          if (!missionsByCategory || !Array.isArray(missionsByCategory)) {
            return 0; // Return 0 if missionsByCategory is not an array or is null/undefined
          }
        
          // Calculate the total count of missions
          let totalCount = 0;
          missionsByCategory.forEach(category => {
            totalCount += category.count; // Assuming each category object has a "count" property representing the number of missions
          });
        
          return totalCount;
        });
        

        /**
         * The number of applications.
         */
        nbApplications = computed(() => {
          const filteredData = this.applicationsByStatus(); // Assuming applicationsByUser is a method that returns an array of applications
        
          if (!filteredData || !Array.isArray(filteredData)) {
            return 0; // Return 0 if filteredData is not an array or is null/undefined
          }
        
          return filteredData.length; // Return the length of the filteredData array
        });

        /**
         * The number of users registered in last 6 months
         */
        nbCandidatesLast6Months = toSignal(this.dashboardService.getCandidatesInLast6Months(), { initialValue: [{}] } );

        /**
         * The number of companies registered in last 6 months
         */
        nbCompaniesLast6Months = toSignal(this.dashboardService.getEntreprisesInLast6Months(), { initialValue: [{}] } );

        /**
         * The number of admins registered in last 6 months
         */
        nbAdminsLast6Months = toSignal(this.dashboardService.getAdminsInLast6Months(), { initialValue: [{}] } );

        /**
         * The number of candidates registered in last 6 months
         */
        nbCandidatesTotal = computed(() => {
          const filteredData = this.nbCandidatesLast6Months(); // Assuming nbCandidatesLast6Months is a method that returns the filtered data
        
          if (!filteredData || !Array.isArray(filteredData)) {
            return 0; // Return 0 if filteredData is not an array or is null/undefined
          }
        
          // Calculate the total count of candidates
          let totalCount = 0;
          filteredData.forEach(candidateData => {
            totalCount += candidateData.number_of_candidates; // Assuming each data object has a "count" property representing the number of candidates
          });
        
          return totalCount;
        });

        /**
         * The number of users registered in last 6 months
         */
        nbUsersLast6Months = toSignal(this.dashboardService.getUsersInLast6Months(), { initialValue: [{}] } );

        /**
         * The number of users registered in last 6 months
         */
        nbUsersTotal = computed(() => {
          const filteredData = this.nbUsersLast6Months(); // Assuming nbUsersLast6Months is a method that returns the filtered data
        
          if (!filteredData || !Array.isArray(filteredData)) {
            return 0; // Return 0 if filteredData is not an array or is null/undefined
          }
        
          // Calculate the total count of users
          let totalCount = 0;
          filteredData.forEach(userData => {
            totalCount += userData.admin; 
            totalCount += userData.entreprise;
            totalCount += userData.candidat;
          });
        
          return totalCount;
        });
totalUsers: any;
        

        
  



        





        


    

}
