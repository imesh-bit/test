import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getSelectedUsergroup(usergroup: string): Observable<any> {
    const url = `${this.baseURL}/ControllerUserGroup?usergroup=${usergroup}&getSelectedUsergroup=yes`;
    return this.http.get(url);
  }

  getUserList(): Observable<any> {
    const url = `${this.baseURL}/ControllerUserGroup?getUserList=yes`;
    return this.http.get(url);
  }
  GetGroupList(): Observable<any> {
    const url = `${this.baseURL}/ControllerUserGroup?GetGroupList=yes`;
    return this.http.get(url);
  }
  saveUserGroup(group: any): Observable<any> {
    const url = `${this.baseURL}/ControllerUserGroup?SaveGroup=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, group, { headers });
  }
  saveUser(user: any): Observable<any> {
    const url = `${this.baseURL}/ControllerUser?saveUsers=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, user, { headers });
  }
}
