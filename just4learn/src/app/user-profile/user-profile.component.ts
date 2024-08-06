import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../models/User.model';
import { StatisticsService } from '../statistics.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Inject, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user!: User;



  // MOCK DATA -> wird durch Userobjekt ersetzt

  // MOCK DATA -> muss seperat mittels user id etc. abgefragt werdeb
  cardCollectionCount: string = "loading";
  cardCount: string = "loading";
  lastLearningSession:string = "04-05-2023";


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private statisticsService: StatisticsService,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('userId')!;
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
        this.updateUserData();
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  formatDate(date: Date): string|null {
    const datePipe = new DatePipe(this.locale);
    return datePipe.transform(date, 'medium', '', 'de');
  }

  updateUserData(): void {
    this.updateCardCount()
    this.updateCardCollectionCount()
  }

  updateCardCount(): void {
    this.statisticsService.getCardCount(this.user.id).subscribe({
      next: (result) => {
        this.cardCount = result['cardCount']
      },
      error: (error) => console.error("error in statistics profile: ", error)
    })
  }

  updateCardCollectionCount(): void {
    this.statisticsService.getCardCollectionCount(this.user.id).subscribe({
      next: (result) => {
        this.cardCollectionCount = result['cardCollectionCount']
      },
      error: (error) => console.error("error in statistics profile: ", error)
    })
  }

  handleError(error: HttpErrorResponse): void{
    if(error.status == 403){
      this.router.navigate(['/home']);
    } else {
      console.error("error: ", error.error);
    }
  }
}
