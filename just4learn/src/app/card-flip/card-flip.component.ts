import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-flip',
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.scss']
})
export class CardFlipComponent {
  
  constructor() {
    this.param1 = '';
    this.param2 = '';
    this.param3 = '';
  }

  @Input() param1: string;
  @Input() param2: string;
  @Input() param3: string;
}
