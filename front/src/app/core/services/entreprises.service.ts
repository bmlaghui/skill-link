import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntreprisesService {


  http = inject(HttpClient);
  
  getEntreprises() {
    return this.http.get<any[]>(`${environment.apiUrl}/entreprises`);
  }

}
