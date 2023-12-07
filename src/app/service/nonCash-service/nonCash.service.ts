import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NonCashService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getNonCashList(): Observable<any> {
    const url = `${this.baseURL}/ControllerNoncash?getNoncashList=yes`;
    return this.http.get(url);
  }


  saveNonCash(group: any): Observable<any> {
    const url = `${this.baseURL}/ControllerNoncash?saveNoncash=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, group, { headers });
  }

}
