import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WageboardService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  getwageboardList(): Observable<any> {
    return this.http.get(this.baseURL+'/ControllerCategory?getCategoryList=yes');
  }

  savewageboard(wageboardData: any): Observable<any> {
    const url = `${this.baseURL}/ControllerCategory?saveCategory=yes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, wageboardData, { headers });
  }
}
