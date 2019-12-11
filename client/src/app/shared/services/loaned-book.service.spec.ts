import { TestBed } from '@angular/core/testing';

import { LoanedBookService } from './loaned-book.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LoanedBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: LoanedBookService = TestBed.get(LoanedBookService);
    expect(service).toBeTruthy();
  });
});
