import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private http: HttpClient) { }

  // public login(
  //   username: string,
  //   password: string
  // ) {

  //   const headers = { 'content-type': 'application/json' };
  //   const body = JSON.stringify({ username: username, password: password });
  //   return this.http.post(this.authURL + 'login', body, {
  //     headers: headers,
  //   });
  // }

  public login(username: string, password: string) {
    const queryParams = `userName=${username}&password=${password}&loginCheck=yes`;
    const url = `${this.authURL}ControllerLogin?${queryParams}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url,  { headers });
  }

  public isLoginIn() {
    console.log();

    return localStorage.getItem("token");

  }

}
