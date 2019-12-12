import { TestBed } from '@angular/core/testing';

import { GenreService } from './genre.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GenreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ],
    providers:[
      HttpTestingController
    ]
  }));

  it('should be created', () => {
    const service: GenreService = TestBed.get(GenreService);
    expect(service).toBeTruthy();
  });
});
