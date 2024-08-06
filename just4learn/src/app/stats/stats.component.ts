import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User.model';
import { CardCollectionService } from 'src/app/card-collection.service';
import { CardCollection } from 'src/app/models/CardCollection.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Inject, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  user!: User;
  cardCollections: CardCollection[] = [];
  cardCollectionScore: { [key: string]: Number } = {}; // Map-like structure with keys and values


  constructor(
    private route: ActivatedRoute,
    private cardCollectionService: CardCollectionService,
    public userService: UserService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.fetchCardCollections()
    
  }
  friends: { firstName: string, lastName: string, email: string, userId: string }[] = [];

  formatDate(date: Date): string|null {
    const datePipe = new DatePipe(this.locale);
    return datePipe.transform(date, 'medium', '', 'de');
  }

  fetchCardCollections(){
    let userID = this.route.snapshot.paramMap.get('userId');
    if (!userID)
    {
      userID = localStorage.getItem("USER_ID");
      console.log("userId", userID);
    }

    
    this.userService.getFriends().subscribe({
      next: (users) => {
        console.log("user", users)
        
        for (let i = 0; i<users.friends.length; ++i)
        {
          
          
          const user = users.friends[i]; 

          this.cardCollectionService.getAllCardCollectionsForUser(user.id).subscribe({
            next: (cardCollections: CardCollection[]) => {
              for (let i = 0; i<cardCollections.length; ++i)
                this.cardCollections.push(cardCollections[i]);

             
              console.log(userID, cardCollections)
              
              for (let i = 0; i<this.cardCollections.length; ++i)
              {
                const cardCollectionInstance = this.cardCollections[i];
                this.cardCollectionService.getCardCollectionScore(userID, cardCollectionInstance.id).subscribe((resultValue: Number) => {
                  console.log("resultValue:", resultValue)
                  this.cardCollectionScore[cardCollectionInstance.id] = resultValue
                });
      
              }
      
            },
            error: (error) => {
              this.handleError(error)
            }
          });

          console.log("user", user)
          this.friends.push({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userId: user.id
        })
      }
      },
      error: (error) => {
      }
    });

    this.cardCollectionService.getAllCardCollectionsForUser(userID).subscribe({
      next: (cardCollections: CardCollection[]) => {
        for (let i = 0; i<cardCollections.length; ++i)
          this.cardCollections.push(cardCollections[i]);

        console.log(userID, cardCollections)
        
        for (let i = 0; i<this.cardCollections.length; ++i)
        {
          const cardCollectionInstance = this.cardCollections[i];
          this.cardCollectionService.getCardCollectionScore(userID, cardCollectionInstance.id).subscribe((resultValue: Number) => {
            console.log("resultValue:", resultValue)
            this.cardCollectionScore[cardCollectionInstance.id] = resultValue
          });

        }

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
}
