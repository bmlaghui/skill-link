import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  http = inject (HttpClient)

  getUsersByroleStats() {
    return this.http.get<any[]>(`${environment.apiUrl}/dashboard_users_by_role`);
  }

  getEntreprisesByCategoryStats() {
    return this.http.get<any[]>(`${environment.apiUrl}/dashboard_entreprises_by_category`);
  }

  getMissionsByCategoryStats() {
    return this.http.get<any[]>(`${environment.apiUrl}/dashboard_missions_by_category`);
  }

  getApplicationsByStatusStats() {
    return this.http.get<any[]>(`${environment.apiUrl}/dashboard_applications_by_status`);
  }

  getCandidatesInLast6Months() {
    return this.http.get<any[]>(`${environment.apiUrl}/dashboard_candidates_last6months`);
  }

  getEntreprisesInLast6Months() {
    return this.http.get<any[]>(`${environment.apiUrl}/dashboard_entreprises_last6months`);
  }

  getAdminsInLast6Months() {
    return this.http.get<any[]>(`${environment.apiUrl}/dashboard_admins_last6months`);
  }

  getUsersInLast6Months() {
    return this.http.get<any[]>(`${environment.apiUrl}/dashboard_users_last6months`);
  }




}
