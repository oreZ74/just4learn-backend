import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCollectionListComponent } from './card-collection-list.component';

describe('CardCollectionListComponent', () => {
  let component: CardCollectionListComponent;
  let fixture: ComponentFixture<CardCollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCollectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
