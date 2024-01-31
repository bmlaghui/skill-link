// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TokenService } from './token.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;


  public user: User = {} as User;

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
    this.http.get<any>(`${this.apiUrl}/logout`, {});
    this.tokenService.removeToken(); 
    this.user = {} as User;
    return of(true);
  }

  connectedUser(): Observable<any> {
    const token = this.tokenService.getDecodedToken();
    console.log(token);
    return this.http.get<any>(`${this.apiUrl}/users/${token.userId}`);
  }

  handleError(errorResp: any) {    
    if (errorResp.error instanceof ErrorEvent) {
      console.error('Client side error:', errorResp.error.message);
    } else {
      console.error('Server side error:', errorResp);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  
  
 
}

