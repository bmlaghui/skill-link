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
    const apiUrl = `weatherapi/data/2.5/weather?q=${city}&appid=${environment.weatherApiKey}&units=metric`;
    console.log(this.http.get<any>(apiUrl));
    return this.http.get<any>(apiUrl);
  } 
  
}
