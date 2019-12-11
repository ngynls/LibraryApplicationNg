import { TestBed } from '@angular/core/testing';

import { BookCopyService } from './book-copy.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BookCopyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: BookCopyService = TestBed.get(BookCopyService);
    expect(service).toBeTruthy();
  });
});
