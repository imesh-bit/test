import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getPositionsList(): Observable<any> {
    return this.http.get(this.baseURL+'/ControllerDivision?getDivisionList=yes');
  }

  savePositions(position: any): Observable<any> {
    const url = `${this.baseURL}/ControllerDivision?saveDivison=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, position, { headers });
  }
}
