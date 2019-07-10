import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BooksComponent } from './pages/books/books.component';
import { AuthorsComponent } from './pages/authors/authors.component';

import { AuthorService } from './shared/services/author.service';
import { AddAuthorComponent } from './pages/authors/add-author/add-author.component';
import { EditAuthorComponent } from './pages/authors/edit-author/edit-author.component';
import { GenresComponent } from './pages/genres/genres.component';
import { PublishersComponent } from './pages/publishers/publishers.component';
import { AddGenreComponent } from './pages/genres/add-genre/add-genre.component';
import { EditGenreComponent } from './pages/genres/edit-genre/edit-genre.component';
import { AddPublisherComponent } from './pages/publishers/add-publisher/add-publisher.component';
import { EditPublisherComponent } from './pages/publishers/edit-publisher/edit-publisher.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BooksComponent,
    AuthorsComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    GenresComponent,
    PublishersComponent,
    AddGenreComponent,
    EditGenreComponent,
    AddPublisherComponent,
    EditPublisherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppMaterialModule,
  ],
  providers: [AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
