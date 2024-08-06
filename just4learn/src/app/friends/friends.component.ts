import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  friendForm: FormGroup;
  friends: { firstName: string, lastName: string, email: string, userId: string }[] = [];
  public showError: Boolean = false;

  ngOnInit(): void {
    this.userService.getFriends().subscribe({
      next: (users) => {
        console.log("user", users)
        
        for (let i = 0; i<users.friends.length; ++i)
        {
          
          const user = users.friends[i]; 
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
        this.showError = true;
      }
    });
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.friendForm = this.formBuilder.group({
      newFriendEmail: ['', Validators.required],
    });
  }

  addFriend() {
    if (this.friendForm.valid) {
      const { newFriendEmail } = this.friendForm.value;
      this.showError = false;
      this.userService.addFriend(newFriendEmail).subscribe({
        next: (user) => {
          this.friends.push({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userId: user.id
          })
        },
        error: (error) => {
          this.showError = true;
        }
      });
      //this.friends.push({ name: newFriendName, age: newFriendAge });
      this.friendForm.reset();

    }
    
  }
  deleteFriend(userId: string) {
    this.userService.removeFriend(userId).subscribe({
      next: (result) => {
        this.friends = this.friends.filter(friend => friend.userId !== userId);

      },
      error: (error) => {
      }
    });
  }
}
