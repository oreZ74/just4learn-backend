import { Component , OnInit, Input } from '@angular/core';
import { User } from '../models/User.model';
import { CardCollectionService } from 'src/app/card-collection.service';
import { CardCollection } from 'src/app/models/CardCollection.model';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Card } from 'src/app/models/Card.model';
import { CardService } from 'src/app/card.service';

@Component({
  selector: 'app-card-flip-list',
  templateUrl: './card-flip-list.component.html',
  styleUrls: ['./card-flip-list.component.scss']
})
export class CardFlipListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cardCollectionService: CardCollectionService,
    private cardService: CardService,
  ) { }

  cards: Card[] = [];

  @Input() collectionId: string = "";
  ngOnInit(): void
  {
    this.fetchCards()
  }
  
  fetchCards() {
    let userID = this.route.snapshot.paramMap.get('userId')!;
    if (!userID)
    {
      userID = localStorage.getItem("USER_ID")!;
      console.log("userId", userID);
    }

    this.cardService.getCards(userID, this.collectionId).subscribe((cards: Card[]) => {
      this.cards = [...cards]
    });
  }
}
