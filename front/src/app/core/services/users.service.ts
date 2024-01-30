import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient);
  
  getCandidates() {
    return this.http.get<User[]>(`${environment.apiUrl}/candidates`);
  }

  getAdmins() {
    return this.http.get<User[]>(`${environment.apiUrl}/admins`);
  }

  getRecruiters() {
    return this.http.get<User[]>(`${environment.apiUrl}/recruiters`);
  }

  
 
}
