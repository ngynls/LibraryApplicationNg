import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanedBookComponent } from './add-loaned-book.component';

describe('AddLoanedBookComponent', () => {
  let component: AddLoanedBookComponent;
  let fixture: ComponentFixture<AddLoanedBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLoanedBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
