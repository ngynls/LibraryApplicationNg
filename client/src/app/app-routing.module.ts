import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BooksComponent } from './pages/books/books.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AddAuthorComponent } from './pages/authors/add-author/add-author.component';
import { EditAuthorComponent } from './pages/authors/edit-author/edit-author.component';
import { GenresComponent } from './pages/genres/genres.component';
import { AddGenreComponent } from './pages/genres/add-genre/add-genre.component';
import { EditGenreComponent } from './pages/genres/edit-genre/edit-genre.component';
import { PublishersComponent } from './pages/publishers/publishers.component';
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

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'books', component: BooksComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'viewBook/:id', component: ViewBookComponent},
  {path: 'editBook/:id', component: EditBookComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'addAuthor', component: AddAuthorComponent},
  {path: 'editAuthor/:id', component: EditAuthorComponent},
  {path: 'genres', component: GenresComponent},
  {path: 'addGenre', component: AddGenreComponent},
  {path: 'editGenre/:id', component: EditGenreComponent},
  {path: 'publishers', component: PublishersComponent},
  {path: 'addPublisher', component: AddPublisherComponent},
  {path: 'editPublisher/:id', component: EditPublisherComponent},
  {path: 'members', component: MembersComponent},
  {path: 'addMember', component: AddMemberComponent},
  {path: 'editMember/:id', component: EditMemberComponent},
  {path: 'viewMember/:id', component: ViewMemberComponent},
  {path: 'bookCopies', component: BookCopiesComponent},
  {path: 'addBookCopy', component: AddBookCopiesComponent},
  {path: 'editCopy/:id', component: EditBookCopyComponent},
  {path: 'loanedBooks', component: LoanedBooksComponent},
  {path: 'addLoanedBook', component: AddLoanedBookComponent},
  {path: 'editLoanedBook/:id', component: EditLoanedBookComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'addReservation', component: AddReservationComponent},
  {path: 'editReservation/:id', component: EditReservationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
