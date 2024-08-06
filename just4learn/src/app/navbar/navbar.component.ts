import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  userId: string | null = null;
  isLoggedIn: boolean = false;
  toggleMenu: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('USER_ID');
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (window.innerWidth > 1050) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        } else {
          entry.target.classList.remove('hidden');
          if (entry.target.classList.contains('stagger')) {
            entry.target.classList.remove('stagger');
          }
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el: Element) => observer.observe(el));
  }
}