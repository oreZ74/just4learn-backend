// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    console.log("isAuthenticated()")
    const token = localStorage.getItem('JWT_TOKEN_AUTH_ACCESS');
    if (token && token.length < 0)
        return false;

    if (token === undefined)
      return false;

    let state = false;
    try {
      state = !this.jwtHelper.isTokenExpired(token)
    }
    catch (error)
    {
      state = false;
    }

    return state;
  }
}