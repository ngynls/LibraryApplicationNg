import { TestBed } from '@angular/core/testing';

import { MemberService } from './member.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: MemberService = TestBed.get(MemberService);
    expect(service).toBeTruthy();
  });
});
