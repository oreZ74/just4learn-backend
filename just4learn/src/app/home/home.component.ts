import { Component , OnInit} from '@angular/core';
import { User } from '../models/User.model';
import { CardCollectionService } from 'src/app/card-collection.service';
import { CardCollection } from 'src/app/models/CardCollection.model';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Card } from 'src/app/models/Card.model';
import { CardService } from 'src/app/card.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  //cards!: Card[];
  cards: { [key: string]: Card[] } = {}; // Map-like structure with keys and values

  user!: User;
  cardCollections: CardCollection[] = [];
  friends: { firstName: string, lastName: string, email: string, userId: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private cardCollectionService: CardCollectionService,
    private cardService: CardService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.fetchCardCollections(localStorage.getItem("USER_ID"));
    this.userService.getFriends().subscribe({
      next: (users) => {
        console.log("user", users)
        
        for (let i = 0; i<users.friends.length; ++i)
        {
          
          const user = users.friends[i]; 
          console.log("user", user)
          this.fetchCardCollections(user.id);
      }
      },
      error: (error) => {
      }
    });
  }

  fetchCardCollections(userID: string|null){
    this.cardCollectionService.getAllCardCollectionsForUser(userID).subscribe({
      next: (cardCollections: CardCollection[]) => {
        this.cardCollections.push(...cardCollections);

        console.log(userID, cardCollections)

      },
      error: (error) => {
        this.handleError(error)
      }
    });
  }

  handleError(error: HttpErrorResponse): void{
    if(error.status == 403){
      console.log("Permission denied");
    } else {
      console.error("error: ", error.error);
    }
  }
  trackByCardId(index: number, card: Card): string {
    return card.id; // Replace "id" with the actual unique identifier of the card
  }
}

