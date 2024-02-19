import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient);
  
  getUsersByRole(role: string) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/role/${role}`);
  }

  createUser(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }

  
 
}
