import { TestBed } from '@angular/core/testing';

import { CardCollectionService } from './card-collection.service';

describe('CardCollectionService', () => {
  let service: CardCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
