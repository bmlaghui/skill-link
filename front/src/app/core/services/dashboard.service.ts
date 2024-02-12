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




}
