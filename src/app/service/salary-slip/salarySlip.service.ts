import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SalarySlipService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getSalarySlip(monthCode: any): Observable<any> {
    const params = new HttpParams()
    .set('printslip', 'yes')
    .set('monthcode', monthCode);
    // .set('empid', empId);

  return this.http.get(this.baseURL + '/ControllerSalarySlip', {
    params,
    responseType: 'blob'
  });
  }
  
  // public viewLabReportPDF(repNo: any, repType: any) {
  //   const url = `${this.baseUrl}/labReports/report/${repNo}/${repType}`;
  //   return this.http.get(url, { responseType: 'blob' as 'json' });
  // }
}
