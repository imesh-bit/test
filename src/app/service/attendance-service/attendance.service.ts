import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AttendanceService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getAttendanceList(monthCode: string): Observable<any> {
    const params = new HttpParams().set('getAttendanceList', 'yes').set('monthCode', monthCode);
    return this.http.get(this.baseURL + '/ControllerAttendance', { params });
  }

  saveAttendance(attendance: any): Observable<any> {
    const url = `${this.baseURL}/ControllerAttendance?saveAttendance=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, attendance, { headers });
  }

  saveAttendanceList(attendance: any): Observable<any> {
    const url = `${this.baseURL}/ControllerAttendance?saveAttendanceExcel=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, attendance, { headers });
  }
  deleteAttendance(attendanceData: any): Observable<any> {
    const url = `${this.baseURL}/ControllerAttendance?deleteAttendance=yes`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, attendanceData, { headers });
  }
}
