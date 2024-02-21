import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../interfaces/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  http = inject(HttpClient);
  
  getAllMissions(currentPage: number, pageSize: number) {
    return this.http.get<Mission[]>(`${environment.apiUrl}/missions?page=${currentPage}&limit=${pageSize}`);
  }
  
}
