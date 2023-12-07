import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getDesignationList(): Observable<any> {
    return this.http.get(this.baseURL+'/ControllerDesignation?getDesignationList=yes');
  }

  saveDesignation(designation: any): Observable<any> {
    const url = `${this.baseURL}/ControllerDesignation?saveDesignation=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, designation, { headers });
  }
  deleteData(designation: any): Observable<any> {
    const url = `${this.baseURL}/ControllerDesignation?deleteDesignation=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, designation, { headers });
  }
}
