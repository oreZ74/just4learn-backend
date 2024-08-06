import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

@Injectable()
export class AuthLoginGuardService implements CanActivate {
  constructor(public auth: AuthService, public location: Location) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.location.back();
      return false;
    }
    return true;
  }
}