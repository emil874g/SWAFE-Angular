import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card-service.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
