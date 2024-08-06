import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';
import { CardCollectionService } from 'src/app/card-collection.service';
import { User } from 'src/app/models/User.model';
import { CardCollection } from 'src/app/models/CardCollection.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { Card } from 'src/app/models/Card.model';
import { CardService } from 'src/app/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})

export class CardListComponent implements OnInit {
  @ViewChild('template') modalTemplate!: TemplateRef<any>;

  cards!: Card[];
  modalRef?:BsModalRef;
  cardDetails: { [key: string]: any } = {}; // Map-like structure with keys and values



  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private cardService: CardService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.fetchCards();
  }

  fetchCards(){
    
    const userId = this.route.snapshot.paramMap.get('userId')!;
    const cardCollectionId = this.route.snapshot.paramMap.get('collectionId')!;
    this.cardService.getCards(userId, cardCollectionId).subscribe((cards: Card[]) => {
      this.cards = cards;
      for (let i = 0; i<cards.length; ++i)
      {
        const card = cards[i];
        this.cardService.getLearnings(userId, cardCollectionId, card.id).subscribe((resultCard: Card) => {
          console.log("resultCard: ", resultCard);
          
          this.cardDetails[card.id] = {
            right: resultCard.right,
            calls: resultCard.calls,
            wrong: resultCard.wrong
          }
        });
      }
      console.log(userId, cards)
    });
  }

  deleteLastCardId:string = "";
  deleteLastCardName:string|undefined = "";
  showDeleteAlert:boolean = false;
  deleteSuccess?:boolean;
  deleteCardClicked(cardId:string){
    console.log(`Trying to delete collection: ${cardId}`)
    this.deleteLastCardId = cardId
    this.deleteLastCardName = this.cards.find(card => card.id == cardId)?.title

    this.modalRef = this.modalService.show(this.modalTemplate, {class: 'modal-sm', animated:true});
  }

  deleteCardConfimed(){
    this.modalRef?.hide();
    if(this.deleteLastCardId == ""){
      console.log("ey");
      return;
    }
    console.log(`Confimed deletion of card with id: ${this.deleteLastCardId}`);
    const userId = this.route.snapshot.paramMap.get('userId')!;
    const collectionId = this.route.snapshot.paramMap.get('collectionId')!;
    const res = this.cardService.deleteCard(userId, collectionId, this.deleteLastCardId,).subscribe({
      
      next: (response) => {
        //console.log(response)
        //console.log('HTTP status code:', response.status);
        //if(response.status == 204){
          this.deleteSuccess = true;
          this.showDeleteAlert = true;
          this.fetchCards();
        //}
      },
      error: (error) => {
        console.error('Error occurred:', error);
        // Handle the error here
        this.deleteSuccess = false;
        this.showDeleteAlert = true;
        
      }
    });
  }

  deleteCardDeclined(){
    this.modalRef?.hide()
    this.deleteLastCardId = ""
  }
}
