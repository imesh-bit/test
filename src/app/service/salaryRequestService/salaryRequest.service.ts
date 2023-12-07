import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryRequestService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getAllSalaryReqList(monthCode: string): Observable<any> {
    const params = new HttpParams().set('getAdvanceList', 'yes').set('monthCode', monthCode);
    return this.http.get(this.baseURL + '/ControllerSalryAdvance', { params });
  }
  saveSalaryReq(salaryReq: any): Observable<any> {
    const url = `${this.baseURL}/ControllerSalryAdvance?saveAdvance=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, salaryReq, { headers });
  }
  deleteSalaryAdvance(attendanceData: any): Observable<any> {
    const url = `${this.baseURL}/ControllerSalryAdvance?deleteAdvance=yes`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, attendanceData, { headers });
  }
}
