import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BooksComponent } from './pages/books/books.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AddAuthorComponent } from './pages/authors/add-author/add-author.component';
import { EditAuthorComponent } from './pages/authors/edit-author/edit-author.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'books', component: BooksComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'addAuthor', component: AddAuthorComponent},
  {path: 'editAuthor/:id', component: EditAuthorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
