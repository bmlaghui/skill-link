import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, first } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { catchError, finalize, take } from 'rxjs/operators'; // Import the take operator

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  /**
   * Represents an observable stream of the connection status.
   */
  public connected$ = new BehaviorSubject<boolean>(false);
  public connState: boolean = false; // Provide a default value

  constructor(private http: HttpClient) {
  
  
}


testPing() {

  return this.http.get<any>(environment.apiUrl+'/ping');

}

setConnectionState(isConnected: boolean) {
  this.connState = isConnected;
  this.connected$.next(this.connState);
}

}


