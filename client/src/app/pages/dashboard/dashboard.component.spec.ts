import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material';
import { MemberService } from 'src/app/shared/services/member.service';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { BookService } from 'src/app/shared/services/book.service';
import { ChartsModule } from 'ng2-charts';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports:[
        MatCardModule,
        ChartsModule,
        HttpClientTestingModule
      ],
      providers:[
        BookCopyService,
        MemberService,
        BookService,
        HttpTestingController
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
