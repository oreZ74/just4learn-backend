import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsSmudyComponent } from './what-is-smudy.component';

describe('WhatIsSmudyComponent', () => {
  let component: WhatIsSmudyComponent;
  let fixture: ComponentFixture<WhatIsSmudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatIsSmudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatIsSmudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
