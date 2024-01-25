import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Probes } from '../interfaces/probes.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProbesService {


  private baseUrl = environment.apiUrl+'/sondes';
  //private baseUrl = environment.apiUrl+'/api/sondes'
  constructor(private http: HttpClient) {}

  getALL(): Observable<Probes[]> {
    return this.http.get<Probes[]>(this.baseUrl);
  }

  getById(_id:string){
    return this.http.get<Probes>(environment.apiUrl + "/probes/" + _id).pipe(
      map((probe: any) => probe)
    );
  }

      
    create(probe: Probes) {
      return this.http.post(environment.apiUrl + "/probes", probe);
    }
  
    update(probe: Probes) {
      return this.http.put<Probes>(environment.apiUrl + "/probes/" + probe.id, probe).pipe(
        map((_probe: any) => {
          return probe;
        })
      );
    }

    delete(_id:string){
      return this.http.delete(environment.apiUrl+"/probes/"+_id);
    }

    
  


}
