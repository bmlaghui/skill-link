import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Application } from '../interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  http = inject(HttpClient);

  getAllApplications(currentPage: number, pageSize: number) {
    return this.http.get<Application[]>(`${environment.apiUrl}/applications?page=${currentPage}&limit=${pageSize}`);
  }
  
}
