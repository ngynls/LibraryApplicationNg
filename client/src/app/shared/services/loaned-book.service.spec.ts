import { TestBed } from '@angular/core/testing';

import { LoanedBookService } from './loaned-book.service';

describe('LoanedBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanedBookService = TestBed.get(LoanedBookService);
    expect(service).toBeTruthy();
  });
});
