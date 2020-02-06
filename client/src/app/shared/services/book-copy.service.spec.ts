import { TestBed } from '@angular/core/testing';

import { BookCopyService } from './book-copy.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BookCopyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ],
    providers: [
      HttpTestingController
    ]
  }));

  it('should be created', () => {
    const service: BookCopyService = TestBed.get(BookCopyService);
    expect(service).toBeTruthy();
  });
});
