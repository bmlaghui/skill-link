import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  apiKey = 'bd5e378503939ddaee76f12ad7a97608';

  
  getActualTemperature(city: string) {
    const apiUrl = `weatherapi/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    console.log(this.http.get<any>(apiUrl));
    return this.http.get<any>(apiUrl);
  } 
  
}
