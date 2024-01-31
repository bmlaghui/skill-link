import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

constructor() {
  const token = this.getToken();
  this.updateToken(!!token); // Convert truthy/falsy value to a boolean
}
    
    updateToken(status: boolean) {
    this.isAuthentication.next(status);
    }
    
    setToken(token: string) {
    this.updateToken(true);
    localStorage.setItem('CURRENT_TOKEN', token);
    }
    
    getToken(): string | null {
    return localStorage.getItem('CURRENT_TOKEN');
    }
    
    removeToken() {
    this.updateToken(false);
    localStorage.removeItem('CURRENT_TOKEN');
    }


    getDecodedToken(): any {
      try {
        const token = this.getToken();
        if (token) {
          return jwtDecode(token);

        }
        return null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
  
}
