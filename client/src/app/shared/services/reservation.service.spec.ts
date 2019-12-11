import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    expect(service).toBeTruthy();
  });
});
