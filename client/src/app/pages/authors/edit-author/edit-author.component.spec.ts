import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuthorComponent } from './edit-author.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthorService } from 'src/app/shared/services/author.service';

describe('EditAuthorComponent', () => {
  let component: EditAuthorComponent;
  let fixture: ComponentFixture<EditAuthorComponent>;
  let compiled;
  const mockForm = <NgForm>{
    value: {
        firstName: "Dann",
        lastName: "Brown"
    }
};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditAuthorComponent,
      ],
      imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers:[
        AuthorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled=fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the words Edit an author in the mat card header', ()=>{
    expect(compiled.querySelector('mat-card').textContent).toContain('Edit an author');
  });

  it('should render the form field for the first name of the author', ()=>{
    expect(compiled.querySelector('input[name="firstName"]')).toBeTruthy();
  });

  it('should render the form field for the last name of the author', ()=>{
    expect(compiled.querySelector('input[name="lastName"]')).toBeTruthy();
  });

  it('should render the edit button', ()=>{
    expect(compiled.querySelector('button').textContent).toContain('Edit');
  });

  describe('Edit of a new author', ()=>{
    it('should edit an author successfully', ()=>{
      const spy= spyOn(component, 'onSubmit');
      component.onSubmit(mockForm);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should ngOnDestroy', ()=>{
    const spy= spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
