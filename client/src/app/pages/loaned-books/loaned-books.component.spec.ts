import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanedBooksComponent } from './loaned-books.component';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('LoanedBooksComponent', () => {
  let component: LoanedBooksComponent;
  let fixture: ComponentFixture<LoanedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanedBooksComponent ],
      providers:[
        MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
