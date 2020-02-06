import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-edit-book-copy',
  templateUrl: './edit-book-copy.component.html',
  styleUrls: ['./edit-book-copy.component.scss']
})
export class EditBookCopyComponent implements OnInit, OnDestroy {

  copyToEdit:BookCopy={
    _id:'',
    copyName: '',
    bookId: '',
    status: ''
  }
  bookControl=new FormControl();
  books:Book[];
  filteredBooks:Observable<any[]>;
  ngUnsubscribe = new Subject<void>();

  constructor(private copyService:BookCopyService, private router:Router, private route:ActivatedRoute, private snackbar:MatSnackBar,
  private bookService:BookService , private location:Location) { }

  ngOnInit() {
    this.copyService.getBookCopy(this.route.snapshot.params['id']).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:BookCopy)=>{
      this.copyToEdit=data;
      console.log(this.copyToEdit);
      if(this.route.snapshot.queryParams['bookId']){
        this.copyToEdit.bookId=this.route.snapshot.queryParams['bookId'];
      }
    },
    (err)=>{
      console.log(err);
    });
    this.bookService.getBooks().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Book[])=>{
      this.books=data;
      this.filteredBooks = this.bookControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this.filterBook(title) : this.books.slice())
      );
    },
    (err)=>{
      console.log(err);
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
    this.copyService.editBookCopy(this.route.snapshot.params['id'], this.copyToEdit).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res)=>{
      this.snackbar.open("Copy was edited successfully", "Close", {
        duration: 2000,
      });
    },
    (err)=>{
      this.snackbar.open("An error has occured. Unable to edit book copy", "Close", {
        duration: 2000,
      });
    });
    this.location.back();
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
