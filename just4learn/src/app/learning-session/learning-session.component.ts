import { Component, OnInit } from '@angular/core';
import { Card } from '../models/Card.model';
import { HttpClient } from '@angular/common/http';
import { CardService } from '../card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-learning-session',
  templateUrl: './learning-session.component.html',
  styleUrls: ['./learning-session.component.scss']
})
export class LearningSessionComponent implements OnInit {

  cards: Card[] = [];
  currentCard: Card | undefined;
  answerRevealed = false;
  userId = this.route.snapshot.paramMap.get('userId')!;
  cardCollectionId = this.route.snapshot.paramMap.get('collectionId')!;
  right = 0;
  wrong = 0;

  constructor(
    private router: Router,
    private cardService: CardService,
    private route: ActivatedRoute,

    ) { } // inject HttpClient to make requests to your API

  ngOnInit(): void {
    this.loadCards();
    this.initLearnings();
  }

  loadCards(): void {
    this.cardService.getCards(this.userId, this.cardCollectionId)
      .subscribe((cards) => {
        this.cards = cards;
        this.showNextCard();
      });
  }

  initLearnings():void {
      const userId:string|null = this.route.snapshot.paramMap.get('userId');
      console.log("userid", userId);
      this.cardService.initLearnings(userId, this.cardCollectionId)?.subscribe((result) => {
        console.log(result);
      });
  }

  showNextCard(): void {
    this.currentCard = this.cards.pop();
    this.answerRevealed = false;
  }

  revealAnswer(): void {
    this.answerRevealed = true;
  }
  userResponse(correct: boolean): void {
    if (this.currentCard) {
      if(correct)
        this.right++;
      else
        this.wrong++;
      this.cardService.cardCalled(this.userId, this.cardCollectionId, this.currentCard._id, correct).subscribe(() => {
        if (this.cards.length > 0) {
          this.showNextCard();
        } else {
          this.currentCard = undefined;
        }
      });
    }
  }
  cancelLearning(): void {
    this.router.navigate([`/sets`]);
  }
}
