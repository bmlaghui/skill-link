// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response) => {
        if (response && response.token) {
          // Store the token securely (consider using HttpOnly cookies for better security).
          this.tokenService.setToken(response.token);
          return response;
        }
      }),
    
    );
  }

  logout(): Observable<any> {
    this.http.post<any>(`${this.apiUrl}/logout`, {});
    this.tokenService.removeToken(); 
    return of(true);
  }

  



  
}
