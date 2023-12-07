import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OccupationalGroupService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getOccupationList(): Observable<any> {
    return this.http.get(this.baseURL+'/ControllerOccupationalGroup?getGroupList=yes');
  }

  saveOccupation(position: any): Observable<any> {
    const url = `${this.baseURL}/ControllerOccupationalGroup?saveGroup=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, position, { headers });
  }

}
