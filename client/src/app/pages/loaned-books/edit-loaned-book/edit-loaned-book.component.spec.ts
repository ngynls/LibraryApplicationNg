import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoanedBookComponent } from './edit-loaned-book.component';

describe('EditLoanedBookComponent', () => {
  let component: EditLoanedBookComponent;
  let fixture: ComponentFixture<EditLoanedBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoanedBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoanedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
