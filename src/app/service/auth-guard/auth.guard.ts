import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth-service/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private service: AuthService, private router: Router,) {

  }

  canActivate() {
    if (this.service.isLoginIn()) {

      return true;
    }
    this.router.navigate(["/login"])
    return false;
  }
  canDeactivate(): boolean {
    if (this.service.isLoginIn()) {

      return false;
    }
    return true;
  }
}
