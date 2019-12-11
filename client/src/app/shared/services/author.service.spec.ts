import { TestBed } from '@angular/core/testing';

import { AuthorService } from './author.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AuthorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: AuthorService = TestBed.get(AuthorService);
    expect(service).toBeTruthy();
  });
});
