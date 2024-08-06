import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlipListComponent } from './card-flip-list.component';

describe('CardFlipListComponent', () => {
  let component: CardFlipListComponent;
  let fixture: ComponentFixture<CardFlipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFlipListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFlipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
