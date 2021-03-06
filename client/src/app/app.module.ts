import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { ChartsModule } from 'ng2-charts';

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
import { AddBookComponent } from './pages/books/add-book/add-book.component';
import { MembersComponent } from './pages/members/members.component';
import { AddMemberComponent } from './pages/members/add-member/add-member.component';
import { ViewBookComponent } from './pages/books/view-book/view-book.component';
import { BookCopiesComponent } from './pages/book-copies/book-copies.component';
import { AddBookCopiesComponent } from './pages/book-copies/add-book-copies/add-book-copies.component';
import { EditBookCopyComponent } from './pages/book-copies/edit-book-copy/edit-book-copy.component';
import { ViewMemberComponent } from './pages/members/view-member/view-member.component';
import { EditMemberComponent } from './pages/members/edit-member/edit-member.component';
import { LoanedBooksComponent } from './pages/loaned-books/loaned-books.component';
import { AddLoanedBookComponent } from './pages/loaned-books/add-loaned-book/add-loaned-book.component';
import { EditLoanedBookComponent } from './pages/loaned-books/edit-loaned-book/edit-loaned-book.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { AddReservationComponent } from './pages/reservations/add-reservation/add-reservation.component';
import { EditReservationComponent } from './pages/reservations/edit-reservation/edit-reservation.component';
import { EditBookComponent } from './pages/books/edit-book/edit-book.component';
import { NavbarComponent } from './shared/ux-components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './shared/authHelpers/auth.guard';
import { AuthService } from './shared/services/auth.service';

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
    AddBookComponent,
    MembersComponent,
    AddMemberComponent,
    ViewBookComponent,
    BookCopiesComponent,
    AddBookCopiesComponent,
    EditBookCopyComponent,
    ViewMemberComponent,
    EditMemberComponent,
    LoanedBooksComponent,
    AddLoanedBookComponent,
    EditLoanedBookComponent,
    ReservationsComponent,
    AddReservationComponent,
    EditReservationComponent,
    EditBookComponent,
    NavbarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [AuthorService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
