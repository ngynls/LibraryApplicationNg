import { TestBed } from '@angular/core/testing';

import { PublisherService } from './publisher.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PublisherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: PublisherService = TestBed.get(PublisherService);
    expect(service).toBeTruthy();
  });
});
