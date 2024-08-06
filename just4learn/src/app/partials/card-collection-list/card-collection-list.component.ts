import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';
import { CardCollectionService } from 'src/app/card-collection.service';
import { CardCollection } from 'src/app/models/CardCollection.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-card-collection-list',
  templateUrl: './card-collection-list.component.html',
  styleUrls: ['./card-collection-list.component.scss']
})

export class CardCollectionListComponent implements OnInit {
  @ViewChild('template') modalTemplate!: TemplateRef<any>;

  cardCollections!: CardCollection[];
  modalRef?:BsModalRef;
  @Input() isFromFriend: Boolean = true;
  @Input() selectedUserId: string|null = ""; 


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private cardCollectionService: CardCollectionService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.fetchCardCollections();
  }

  fetchCardCollections(){
    let userId = this.route.snapshot.paramMap.get('userId');
    userId = this.selectedUserId; 

    console.log("this.selectedUserId", this.selectedUserId);

    if (!userId)
    {
      userId = localStorage.getItem("USER_ID");
      console.log("userId", userId);
    }

    this.cardCollectionService.getAllCardCollectionsForUser(userId).subscribe({
      next: (cardCollections: CardCollection[]) => {
        this.cardCollections = cardCollections;
        console.log(userId, cardCollections)
      },
      error: (error) => {
        this.handleError(error)
      }
    });
  }

  deleteLastCollectionId:string = "";
  deleteLastCollectionName:string|undefined = "";
  showDeleteAlert:boolean = false;
  deleteSuccess?:boolean;
  deleteCardCollectionClicked(collectionId:string){
    console.log(`Trying to delete collection: ${collectionId}`)
    this.deleteLastCollectionId = collectionId
    this.deleteLastCollectionName = this.cardCollections.find(collection => collection.id == collectionId)?.collectionName

    this.modalRef = this.modalService.show(this.modalTemplate, {class: 'modal-sm', animated:true});
  }

  deleteCardCollectionConfimed(){
    this.modalRef?.hide();
    if(this.deleteLastCollectionId == ""){
      return;
    }
    console.log(`Confimed deletion of card collection with id: ${this.deleteLastCollectionId}`);
    const userId = this.route.snapshot.paramMap.get('userId')!;
    const res = this.cardCollectionService.removeCardCollectionById(userId, this.deleteLastCollectionId).subscribe({
      next: (response) => {
        console.log('HTTP status code:', response.status);
        if(response.status == 204){
          this.deleteSuccess = true;
          this.showDeleteAlert = true;
          this.fetchCardCollections();
        }
      },
      error: (error) => {
        console.error('Error occurred:', error);
        // Handle the error here
        this.deleteSuccess = false;
        this.showDeleteAlert = true;
      }
    });
  }

  deleteCardCollectionDeclined(){
    this.modalRef?.hide()
    this.deleteLastCollectionId = ""
  }

  handleError(error: HttpErrorResponse): void{
    if(error.status == 403){
      console.log("Permission denied");
    } else {
      console.error("error: ", error.error);
    }
  }
}
