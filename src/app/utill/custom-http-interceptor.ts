import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
    constructor(private jwtHelper: JwtHelperService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token != null && this.jwtHelper.isTokenExpired(token)) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });

            console.log('token class ', token);
            console.log('custom-http-class : ', req);
        } else {
            // Handle the case when the token is not present or expired
            // You may want to clear localStorage and navigate to the login page
            // localStorage.clear();
            this.router.navigate(['/login']);
        }

        return next.handle(req);
    }
}
