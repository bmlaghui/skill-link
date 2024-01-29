import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  
  getActualTemperature(city: string) {
    const apiUrl = `/weatherapi/?q=${city}&appid=${environment.weatherApiKey}&units=metric`;
    return this.http.get<any>(apiUrl);
  } 
  
}
