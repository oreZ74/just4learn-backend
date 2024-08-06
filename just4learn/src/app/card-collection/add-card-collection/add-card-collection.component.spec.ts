import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCardCollectionComponent } from './add-card-collection.component';


describe('AddCardCollectionComponent', () => {
  let component: AddCardCollectionComponent;
  let fixture: ComponentFixture<AddCardCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCardCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
