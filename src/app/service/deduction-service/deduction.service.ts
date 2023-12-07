import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getDeductionList(): Observable<any> {
    return this.http.get(this.baseURL + '/ControllerDeduction?getDeductionList=yes');
  }

  saveDeduction(deductionData: any): Observable<any> {
    // const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(deductionData);
    // console.log(body + " request working");

    // return this.http.post(this.baseURL + "/ControllerDeduction?saveDeduction=yes", body, {
    //   headers: headers,
    // });

    const url = `${this.baseURL}/ControllerDeduction?saveDeduction=yes`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, deductionData, { headers });
  }
}
