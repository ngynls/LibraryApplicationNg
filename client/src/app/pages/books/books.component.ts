import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../shared/models/book.model';
import { BookService } from '../../shared/services/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[];
  displayedColumns: string[] = ['title', 'language', 'view', 'delete'];
  dataSource: MatTableDataSource<Book>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookService: BookService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe((data: Book[])=>{
      this.books=data;
      this.dataSource=new MatTableDataSource<Book>(this.books);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToAddBook(){
    this.router.navigateByUrl('/addBook');
  }

  deleteBook(id, book){
    if(window.confirm(`Are you sure you want to delete this book? [${book.title}]`)){
      this.bookService.deleteBook(id).subscribe(
        res=>{
          this.snackbar.open("Author was deleted successfully", "Close", {
            duration: 2000,
          });
        }
      );
      const index=this.dataSource.data.indexOf(id);
      this.dataSource.data.splice(index,1);
      this.dataSource._updateChangeSubscription();
    }
  }

}
