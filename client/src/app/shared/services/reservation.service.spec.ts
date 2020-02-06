import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ],
    providers:[
      HttpTestingController
    ]
  }));

  it('should be created', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    expect(service).toBeTruthy();
  });
});
