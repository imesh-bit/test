import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryMonthService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getSalaryMonthList(): Observable<any> {
    return this.http.get(this.baseURL + '/ControllerSalaryMonth?getSalMonthList=yes');
  }

  saveMonth(allowanceData: any): Observable<any> {
    const url = `${this.baseURL}/ControllerSalaryMonth?saveMonth=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, allowanceData, { headers });
  }

}
