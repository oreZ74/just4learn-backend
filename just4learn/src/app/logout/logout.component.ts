import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem("JWT_TOKEN_AUTH_ACCESS");
    localStorage.removeItem("JWT_TOKEN_AUTH_REFRESH");
    this.router.navigate(['login']);

  }
}
