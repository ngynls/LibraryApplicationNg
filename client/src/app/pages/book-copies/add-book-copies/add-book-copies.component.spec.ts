import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookCopiesComponent } from './add-book-copies.component';

describe('AddBookCopiesComponent', () => {
  let component: AddBookCopiesComponent;
  let fixture: ComponentFixture<AddBookCopiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookCopiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookCopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
