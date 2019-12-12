import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorComponent } from './add-author.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddAuthorComponent', () => {
  let component: AddAuthorComponent;
  let fixture: ComponentFixture<AddAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuthorComponent ],
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
        HttpTestingController
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
