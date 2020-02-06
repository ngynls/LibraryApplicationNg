import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-book-copies',
  templateUrl: './add-book-copies.component.html',
  styleUrls: ['./add-book-copies.component.scss']
})
export class AddBookCopiesComponent implements OnInit, OnDestroy {

  copyToAdd={
    copyName: '',
    bookId: '',
    status: 'Available'
  }
  bookControl=new FormControl();
  books:Book[];
  filteredBooks:Observable<any[]>;
  ngUnsubscribe = new Subject<void>();

  constructor(private copyService: BookCopyService, private bookService:BookService, private snackbar:MatSnackBar,
    private route:ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.bookService.getBooks().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Book[])=>{
      this.books=data;
      this.filteredBooks = this.bookControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this.filterBook(title) : this.books.slice())
      );
    });
    if(this.route.snapshot.queryParams['bookId']){
      this.copyToAdd.bookId=this.route.snapshot.queryParams['bookId'];
    }
  }

  onSubmit(){
    this.copyToAdd.bookId=this.bookControl.value;
    this.copyService.addBookCopy(this.copyToAdd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res=>{
       this.snackbar.open("Copy was added successfully", "Close", {
         duration: 2000,
       });
       this.location.back();
      },
      err=>{
       this.snackbar.open("Unable to add copy", "Close", {
         duration: 2000,
       });
      }
     );
  }

  private filterBook(value: string): Book[] {
    const filterValue = value.toLowerCase();
    return this.books.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  displayBookId(book?: Book): string | undefined {
    return book ? book._id : undefined;
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
