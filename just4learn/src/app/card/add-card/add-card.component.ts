import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  form: FormGroup;
  userId: any;
  cardCollectionId: any;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.cardCollectionId = this.route.snapshot.paramMap.get('collectionId');
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
      
      this.cardService.createCard(this.userId, this.cardCollectionId, cardData).subscribe({
        next: response => {
          console.log('Karte hinzugefügt: ', response);
          this.form.reset();
          
          // navigate to card collection page after creating card
          this.router.navigate([`/users/${this.userId}/card_collections/${this.cardCollectionId}`]);
        },
        error: err => console.error(err)
      });
    }
  }
}
