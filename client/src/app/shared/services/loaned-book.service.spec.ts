import { TestBed } from '@angular/core/testing';

import { LoanedBookService } from './loaned-book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoanedBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ],
    providers:[
      HttpTestingController
    ]
  }));

  it('should be created', () => {
    const service: LoanedBookService = TestBed.get(LoanedBookService);
    expect(service).toBeTruthy();
  });
});
