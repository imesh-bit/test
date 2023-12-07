import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanManagerService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getLoanList(loan: any): Observable<any> {


    const params = new HttpParams().set('getLoanList', 'yes').set('setoff', loan);
    return this.http.get(this.baseURL + '/ControllerLoans', { params });



  }
  saveLoan(loan: any): Observable<any> {
    const url = `${this.baseURL}/ControllerLoans?saveLoan=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, loan, { headers });
  }
  settleLoan(loan: any): Observable<any> {
    const url = `${this.baseURL}/ControllerLoans?settleLoan=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, loan, { headers });
  }

  getSelectedloan(loan: any): Observable<any> {
    const params = new HttpParams().set('getSelectedLoan', 'yes').set('loanid', loan);
    return this.http.get(this.baseURL + '/ControllerLoans', { params });

  }
  getSelectedSettlementList(loan: any): Observable<any> {
    const params = new HttpParams().set('getSelectedSettlementList', 'yes').set('loanid', loan);
    return this.http.get(this.baseURL + '/ControllerLoans', { params });

  }
}
