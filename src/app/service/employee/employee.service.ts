import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class EmployeeService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getSelectedEmployee(empId: number, comCode: string) {
    const url = `${this.baseURL}/ControllerEmployeeProfile?empId=${empId}&comCode=${comCode}&getSelectedEmployee=yes`;
    return this.http.get(url);
  }
  getEmployeeList(comCode: string) {
    const url = `${this.baseURL}/ControllerEmployeeProfile?GetAllEmployeeList=yes&comCode=${comCode}`;
    return this.http.get(url);
  }

  getAllEmpTypeList(comCode: string) {
    const url = `${this.baseURL}/ControllerEmpType?getEmpTypeList=yes&comCode=${comCode}`;
    return this.http.get(url);
  }
  saveEmployeeProfile(employeeProfile: any): Observable<any> {
    const url = `${this.baseURL}/ControllerEmployeeProfile?SaveProfile=yes`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, employeeProfile, { headers });
  }

  deleteEmployee() {

  }
  updateEmployee() {

  }
}
