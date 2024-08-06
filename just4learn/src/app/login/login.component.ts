import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http'; 
import { FormGroup, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  public loading = false;
  public showError = false;

  constructor(private apiService: ApiService, public router: Router) { }

  register(): void {
    this.router.navigate(['register']);

  }
  login(): void {
    // Process checkout data here
    if (!this.loginForm.valid) {
      console.log("Not!")
      return
    }
    this.loading = true;
    this.showError = false;

    console.log("Hello!")
    console.log(this.loginForm.value);

    let username = this.loginForm.value.username;
    if (username === undefined)
      username = "";

    let password = this.loginForm.value.password; 
    if (password === undefined)
      password = ""; 

    this.apiService.login(username as String, password as String, (data: any) => {
      if (data instanceof HttpErrorResponse)
      {
        localStorage.removeItem("JWT_TOKEN_AUTH_ACCESS");
      }
      else (data instanceof Object)
      {
        localStorage.setItem("JWT_TOKEN_AUTH_ACCESS", data.accessToken);
        localStorage.setItem("JWT_TOKEN_AUTH_REFRESH", data.refreshToken);
        localStorage.setItem("USER_ID", data.userId);
        this.router.navigate(['users',localStorage.getItem('USER_ID'),'profile']);
        this.showError = true;
      }      
      this.loading = false;
      
    });
  }
}
