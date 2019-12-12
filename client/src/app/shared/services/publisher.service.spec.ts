import { TestBed } from '@angular/core/testing';

import { PublisherService } from './publisher.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PublisherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ],
    providers:[
      HttpTestingController
    ]
  }));

  it('should be created', () => {
    const service: PublisherService = TestBed.get(PublisherService);
    expect(service).toBeTruthy();
  });
});
