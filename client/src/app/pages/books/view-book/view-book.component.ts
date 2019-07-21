import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from '../../../shared/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  currentBook:Book;
  copies: BookCopy[];
  dataSource: MatTableDataSource<BookCopy>;
  displayedColumns: string[] = ['copyName', 'status', 'edit', 'delete'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookService: BookService, private copyService:BookCopyService, private router:Router,private route:ActivatedRoute,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.bookService.getBook(this.route.snapshot.params['id']).subscribe((data:Book)=>{
      this.currentBook=data;
      console.log(this.currentBook);
    });
    this.copyService.getCopiesForBook(this.route.snapshot.params['id']).subscribe((data:BookCopy[])=>{
      this.copies=data;
      this.dataSource=new MatTableDataSource<BookCopy>(this.copies);
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

  deleteCopy(id, copy){
    if(window.confirm(`Are you sure you want to delete this copy? [${copy.copyName}]`)){
      this.copyService.deleteBookCopy(id).subscribe(
        res=>{
          this.snackbar.open("Copy was deleted successfully", "Close", {
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
