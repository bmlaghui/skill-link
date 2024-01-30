import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  http = inject(HttpClient);
  
  getUsers() {
    return this.http.get<any[]>(`${environment.apiUrl}/users`);
  }

  getEntreprise() {
    return this.http.get<any[]>(`${environment.apiUrl}/entreprises`);
  }

}
