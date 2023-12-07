import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllowanceService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getAllowanceList(): Observable<any> {
    return this.http.get(this.baseURL + '/ControllerAllowance?getAllowanceList=yes');
  }

  saveAllowance(allowanceData: any): Observable<any> {
    const url = `${this.baseURL}/ControllerAllowance?saveAllowance=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, allowanceData, { headers });
  }

  // getAllowanceReq(): Observable<any> {
  //   return this.http.get(this.baseURL+'/ControllerAllowanceRequest?getAllowReqtList=yes');
  // }
  getAllAllowanceReq(monthCode: string,reqType:any): Observable<any> {
    const params = new HttpParams().set('getAllowReqtList', 'yes').set('monthCode', monthCode).set('reqType', reqType);
    return this.http.get(this.baseURL + '/ControllerAllowanceRequest', { params });
  }

  saveAllowanceReq(allowanceData: any): Observable<any> {
    const url = `${this.baseURL}/ControllerAllowanceRequest?saveAllowReq=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, allowanceData, { headers });
  }

  // deleteAllowanceReq(id: any) {
  //   const params = new HttpParams().set('deleteAllowReq', 'yes').set('id', id);
  //   return this.http.get(this.baseURL + '/ControllerAllowanceRequest', { params });
  // }
  deleteAllowanceReq(attendanceData: any): Observable<any> {
    const url = `${this.baseURL}/ControllerAllowanceRequest?deleteAllowReq=yes`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, attendanceData, { headers });
  }

}
