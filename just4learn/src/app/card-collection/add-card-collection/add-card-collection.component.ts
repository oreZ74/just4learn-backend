import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CardCollectionService } from 'src/app/card-collection.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-card-collection',
  templateUrl: './add-card-collection.component.html',
  styleUrls: ['./add-card-collection.component.scss']
})
export class AddCardCollectionComponent {
  form: FormGroup;
  userId: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cardCollectionService: CardCollectionService,

  ) {
    this.form = this.formBuilder.group({
      collectionName: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      let userId = this.route.snapshot.paramMap.get('userId');
      if (userId === undefined || userId === null)
      {
        userId = localStorage.getItem("USER_ID");
        console.log("userId", userId);
      }
      this.userId = userId;

      console.log(this.userId)
      this.cardCollectionService.addCardCollection(this.userId, this.form.value.collectionName).subscribe({
        next: response => {
          console.log('Kartensammlung hinzugefügt: ', response);
          this.form.reset();
          window.location.reload();
        },
        error: err => console.error(err)
      });
    }
  }
}
