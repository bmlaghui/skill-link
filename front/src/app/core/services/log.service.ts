import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Log } from '../interfaces/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  http = inject(HttpClient);
  
  getAllLogs(currentPage: number, pageSize: number) {
    return this.http.get<Log[]>(`${environment.apiUrl}/logs?page=${currentPage}&limit=${pageSize}`);
  }
  
}
