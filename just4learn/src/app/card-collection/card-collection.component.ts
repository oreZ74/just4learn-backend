import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { CardCollectionService } from '../card-collection.service';
import { CardCollection } from '../models/CardCollection.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.scss']
})
export class CardCollectionComponent implements OnInit {
  collection!: CardCollection;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private cardCollectionService: CardCollectionService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId')!;
    const cardCollectionId = this.route.snapshot.paramMap.get('collectionId')!;
    console.log(userId,"userid");
    console.log(cardCollectionId,"collId");

    this.cardCollectionService.getCardCollectionById(userId, cardCollectionId).subscribe({
      next: (collection: CardCollection) => {
        this.collection = collection;
      },
      error: (error) => {
        this.handleError(error)
      }
    });
  }

  handleError(error: HttpErrorResponse): void{
    console.error("error: ", error)
  }
}
