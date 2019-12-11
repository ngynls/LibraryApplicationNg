import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/services/book.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-edit-book-copy',
  templateUrl: './edit-book-copy.component.html',
  styleUrls: ['./edit-book-copy.component.scss']
})
export class EditBookCopyComponent implements OnInit {

  copyToEdit:BookCopy={
    _id:'',
    copyName: '',
    bookId: '',
    status: ''
  }
  bookControl=new FormControl();
  books:Book[];
  filteredBooks:Observable<any[]>;

  constructor(private copyService:BookCopyService, private router:Router, private route:ActivatedRoute, private snackbar:MatSnackBar,
  private bookService:BookService , private location:Location) { }

  ngOnInit() {
    this.copyService.getBookCopy(this.route.snapshot.params['id']).subscribe((data:BookCopy)=>{
      this.copyToEdit=data;
      console.log(this.copyToEdit);
      if(this.route.snapshot.queryParams['bookId']){
        this.copyToEdit.bookId=this.route.snapshot.queryParams['bookId'];
      }
    });
    this.bookService.getBooks().subscribe((data:Book[])=>{
      this.books=data;
      this.filteredBooks = this.bookControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this.filterBook(title) : this.books.slice())
      );
    });
  }

  private filterBook(value: string): Book[] {
    const filterValue = value.toLowerCase();
    return this.books.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  displayBookId(book?: Book): string | undefined {
    return book ? book._id : undefined;
  }

  onSubmit(){
    this.copyService.editBookCopy(this.route.snapshot.params['id'], this.copyToEdit).subscribe((res)=>{
      console.log(res);
    },
    (err)=>{
      console.log(err);
    });
    this.location.back();
    this.snackbar.open("Copy was edited successfully", "Close", {
      duration: 2000,
    });
  }

}
