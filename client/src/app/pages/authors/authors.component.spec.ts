import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsComponent } from './authors.component';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthorService } from 'src/app/shared/services/author.service';
import {of} from 'rxjs';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let mockAuthor={
    "_id": "5d1e5efe755326281459d8f9",
    "firstName": "George R.R",
    "lastName": "Martin",
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsComponent ],
      imports:[
        MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        HttpClientTestingModule
      ],
      providers:[
        AuthorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the words Authors in the mat card header', ()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card').textContent).toContain('Authors');
  });

  it('should fetch all the authors within ngOnInit', ()=>{
    const spy = spyOn(component, 'fetchAllAuthors');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should render all the authors in the table', ()=>{
    const authors = [mockAuthor];
    const spy = spyOn(component['authorService'], 'getAuthors').and.returnValue(of(authors));

    component.fetchAllAuthors();

    expect(spy).toHaveBeenCalled();
    expect(component.authors).toEqual(authors);
  });

  it('should ngOnDestroy', ()=>{
    const spy= spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

});
