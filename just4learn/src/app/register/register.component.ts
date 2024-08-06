import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http'; 
import { FormGroup, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  public loading = false;
  public showError = false;
  public showSuccess = false;

  constructor(private apiService: ApiService, public router: Router, private formBuilder: FormBuilder) { }

  login(): void {
    this.router.navigate(['login']);
  }

  public registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });


  ngOnInit(): void {
    
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.showError = false;
    this.showSuccess = false;

    this.apiService.register(this.registerForm.value.email, this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.firstName, this.registerForm.value.lastName).subscribe({
      next: response => {
        console.log('Register oke: ', response);
        this.registerForm.reset();
        this.loading = false;
        this.showSuccess = true;

      },
      error: () => {
        this.loading = false;
        this.showError = true;
      }
    });
  }
}
