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
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './shared/authHelpers/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'books', component: BooksComponent, canActivate:[AuthGuard]},
  {path: 'addBook', component: AddBookComponent, canActivate:[AuthGuard]},
  {path: 'viewBook/:id', component: ViewBookComponent, canActivate:[AuthGuard]},
  {path: 'editBook/:id', component: EditBookComponent, canActivate:[AuthGuard]},
  {path: 'authors', component: AuthorsComponent, canActivate:[AuthGuard]},
  {path: 'addAuthor', component: AddAuthorComponent, canActivate:[AuthGuard]},
  {path: 'editAuthor/:id', component: EditAuthorComponent, canActivate:[AuthGuard]},
  {path: 'genres', component: GenresComponent, canActivate:[AuthGuard]},
  {path: 'addGenre', component: AddGenreComponent, canActivate:[AuthGuard]},
  {path: 'editGenre/:id', component: EditGenreComponent, canActivate:[AuthGuard]},
  {path: 'publishers', component: PublishersComponent, canActivate:[AuthGuard]},
  {path: 'addPublisher', component: AddPublisherComponent, canActivate:[AuthGuard]},
  {path: 'editPublisher/:id', component: EditPublisherComponent, canActivate:[AuthGuard]},
  {path: 'members', component: MembersComponent, canActivate:[AuthGuard]},
  {path: 'addMember', component: AddMemberComponent, canActivate:[AuthGuard]},
  {path: 'editMember/:id', component: EditMemberComponent, canActivate:[AuthGuard]},
  {path: 'viewMember/:id', component: ViewMemberComponent, canActivate:[AuthGuard]},
  {path: 'bookCopies', component: BookCopiesComponent, canActivate:[AuthGuard]},
  {path: 'addBookCopy', component: AddBookCopiesComponent, canActivate:[AuthGuard]},
  {path: 'editCopy/:id', component: EditBookCopyComponent, canActivate:[AuthGuard]},
  {path: 'loanedBooks', component: LoanedBooksComponent, canActivate:[AuthGuard]},
  {path: 'addLoanedBook', component: AddLoanedBookComponent, canActivate:[AuthGuard]},
  {path: 'editLoanedBook/:id', component: EditLoanedBookComponent, canActivate:[AuthGuard]},
  {path: 'reservations', component: ReservationsComponent, canActivate:[AuthGuard]},
  {path: 'addReservation', component: AddReservationComponent, canActivate:[AuthGuard]},
  {path: 'editReservation/:id', component: EditReservationComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
