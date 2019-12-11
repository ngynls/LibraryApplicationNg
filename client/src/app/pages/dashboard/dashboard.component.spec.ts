import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material';
import { MemberService } from 'src/app/shared/services/member.service';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { BookService } from 'src/app/shared/services/book.service';
import { ChartsModule } from 'ng2-charts';
import { HttpHandler, HttpClient } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports:[
        MatCardModule,
        ChartsModule
      ],
      providers:[
        BookCopyService,
        MemberService,
        BookService,
        HttpClient,
        HttpHandler
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
