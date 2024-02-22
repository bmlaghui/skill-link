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

  deleteUser(id: number) {
    
    return this.http.delete<User>(`${environment.apiUrl}/users/${id}`);

  }

  updateUser(user: User) {
    return this.http.put<User>(`${environment.apiUrl}/users/${user._id}`, user);
  }

  activateUser(id: number) {
    return this.http.put<User>(`${environment.apiUrl}/users/activate/${id}`, {});
  }

  deactivateUser(id: number) {
    return this.http.put<User>(`${environment.apiUrl}/users/deactivate/${id}`, {});
  }

  getUsersByRolePaginated(role: string, currentPage: number, pageSize: number) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/roles/${role}?page=${currentPage}&limit=${pageSize}`);
  }

  
 
}
