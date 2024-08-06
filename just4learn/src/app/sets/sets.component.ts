import { Component } from '@angular/core';
import { AccordionComponent } from 'ngx-bootstrap/accordion';
import { UserService } from '../user.service';



interface Entry
{
  displayName: string;
  userId: string|null;
  isFriend: boolean; 
}

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent {
  open: boolean = true;
  disabled: boolean = true;
  options: Entry[] = [];
  selectedOption: string = "";
  primaryColor: string = '#E88954';

  ngOnInit(): void {
    this.options.push({
      displayName: "Meine Karten",
      userId: localStorage.getItem("USER_ID"),
      isFriend: false
    })
    this.userService.getFriends().subscribe({
      next: (users) => {
        console.log("user", users)
        
        for (let i = 0; i<users.friends.length; ++i)
        {
          
          const user = users.friends[i]; 
          console.log("user", user)
          this.options.push({
            userId: user.id,
            displayName: "Karten von " + user.firstName + " " + user.lastName,
            isFriend: true
        })
      }
      },
      error: (error) => {
      }
    });
  }

  constructor(private userService: UserService) { }

  selectOption(option: string) {
    this.selectedOption = option;
  }
  log(isOpened: boolean){
    console.log(isOpened);
 }
}
