import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonusService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getBonusList(monthCode: string): Observable<any> {
    const params = new HttpParams().set('getBonusList', 'yes').set('monthCode', monthCode);
    return this.http.get(this.baseURL + '/ControllerBonus', { params });
  }
  saveBonus(allowanceData: any): Observable<any> {
    const url = `${this.baseURL}/ControllerBonus?saveBonus=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, allowanceData, { headers });
  }
}
