import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/card.service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent {

  form!: FormGroup;
  userId: any;
  cardCollectionId: any;
  cardId: any;
  card: any;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.cardCollectionId = this.route.snapshot.paramMap.get('collectionId');
    this.cardId = this.route.snapshot.paramMap.get('cardId');
    this.card = this.cardService.getCardById(this.userId, this.cardCollectionId, this.cardId);
    console.log(this.card.title);
    
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });

    this.cardService.getCardById(this.userId, this.cardCollectionId, this.cardId)
    .subscribe(card => {
      this.form.patchValue({
        title: card.title,
        content: card.content,
        question: card.question,
        answer: card.answer
      });
    });
  }
  submit(): void {
    if (this.form.valid) {
      const cardData = {
        userId: this.userId,
        cardCollectionId: this.cardCollectionId,
        title: this.form.value.title,
        content: this.form.value.content,
        question: this.form.value.question,
        answer: this.form.value.answer,
      
      };
        
      this.cardService.patchCardById(this.userId, this.cardCollectionId, this.cardId, cardData).subscribe({
        next: response => {
          console.log('Karte aktualisiert: ', response);
          
          // navigate to card collection page after updating card
          this.router.navigate([`users/${this.userId}/card_collections/${this.cardCollectionId}`]);
        },
        error: (err: any) => console.error(err)
      });
    }
  }
  
}
