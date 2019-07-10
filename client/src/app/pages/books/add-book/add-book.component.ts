import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../../shared/services/book.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookToAdd={
    title: '',
    isbn: '',
    authors: [],
    publishedYear: 0,
    nbOfPages: 0,
    language: '',
    edition: '',
    summary: '',
    cover: '',
    locationInLibrary: '',
    publisher: '',
    genre: '',
    copies: []
  }

  constructor(private bookService:BookService, private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.bookService.addBook(form.value).subscribe(
     res=>{
      this.router.navigateByUrl('/books');
      this.snackbar.open("Book was added successfully", "Close", {
        duration: 2000,
      });
     },
     err=>{
      this.snackbar.open("Unable to add book", "Close", {
        duration: 2000,
      });
     }
    );
  }

}
