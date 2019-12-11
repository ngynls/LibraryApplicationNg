import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BookService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: BookService = TestBed.get(BookService);
    expect(service).toBeTruthy();
  });
});
