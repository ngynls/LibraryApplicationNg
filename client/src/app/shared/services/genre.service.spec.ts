import { TestBed } from '@angular/core/testing';

import { GenreService } from './genre.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('GenreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: GenreService = TestBed.get(GenreService);
    expect(service).toBeTruthy();
  });
});
