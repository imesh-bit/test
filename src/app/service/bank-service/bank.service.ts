import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getBankList(): Observable<any> {
    return this.http.get(this.baseURL + '/ControllerBank?getBankList=yes');
  }

  saveBank(bankDetails: any): Observable<any> {
    const url = `${this.baseURL}/ControllerBank?saveBank=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, bankDetails, { headers });
  }
}
