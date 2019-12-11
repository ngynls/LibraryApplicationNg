import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCopiesComponent } from './book-copies.component';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookCopiesComponent', () => {
  let component: BookCopiesComponent;
  let fixture: ComponentFixture<BookCopiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCopiesComponent ],
      imports:[
        MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers:[
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
