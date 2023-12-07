import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayRollService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getEmployeePayrollData(monthCode: any): Observable<any> {


    const params = new HttpParams().set('getAllPayRollData', 'yes').set('monthCode', monthCode);
    return this.http.get(this.baseURL + '/ControllerPayroll', { params });



  }
  runWizard(monthCode: any): Observable<any> {
    const params = new HttpParams().set('runWizard', 'yes').set('monthCode', monthCode);
    return this.http.get(this.baseURL + '/ControllerPayroll', { params });
  }
  finalizePayroll(monthCode: any): Observable<any> {
    const params = new HttpParams().set('finalizePayroll', 'yes').set('monthCode', monthCode);
    return this.http.get(this.baseURL + '/ControllerPayroll', { params });
  }
  removeEntries(monthCode: any): Observable<any> {
    const params = new HttpParams().set('removeEntries', 'yes').set('monthCode', monthCode);
    return this.http.get(this.baseURL + '/ControllerPayroll', { params });
  }

  getSelectedEmployeePayrollData(monthCode: any, empId: any): Observable<any> {
    const params = new HttpParams()
      .set('getEmpPayRollData', 'yes')
      .set('monthCode', monthCode)
      .set('EmpId', empId); // Add the 'EmpId' parameter here

    return this.http.get(this.baseURL + '/ControllerPayroll', { params });
  }
  savePayroll(payroll: any): Observable<any> {
    const url = `${this.baseURL}/ControllerPayroll?updateEmpPayroll=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, payroll, { headers });
  }
  getExcelData(monthCode: any): Observable<any> {
    const params = new HttpParams().set('getExcelData', 'yes').set('monthCode', monthCode);
    return this.http.get(this.baseURL + '/ControllerPayroll', { params });
  }

}
