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
import { AddBookCopiesComponent } from './pages/book-copies/add-book-copies/add-book-copies.component';
import { EditBookCopyComponent } from './pages/book-copies/edit-book-copy/edit-book-copy.component';
import { ViewMemberComponent } from './pages/members/view-member/view-member.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'books', component: BooksComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'viewBook/:id', component: ViewBookComponent},
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
  {path: 'viewMember/:id', component: ViewMemberComponent},
  {path: 'addBookCopy', component: AddBookCopiesComponent},
  {path: 'editCopy/:id', component: EditBookCopyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
