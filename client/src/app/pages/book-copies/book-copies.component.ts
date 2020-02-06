import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-copies',
  templateUrl: './book-copies.component.html',
  styleUrls: ['./book-copies.component.scss']
})
export class BookCopiesComponent implements OnInit, OnDestroy {

  copies: BookCopy[];
  dataSource: MatTableDataSource<BookCopy>;
  displayedColumns: string[] = ['copyName', 'status', 'edit', 'delete'];
  ngUnsubscribe = new Subject<void>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private copyService:BookCopyService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.copyService.getBookCopies().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:BookCopy[])=>{
      this.copies=data;
      this.dataSource=new MatTableDataSource<BookCopy>(this.copies);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    err =>{
      console.log(err);
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
      this.copyService.deleteBookCopy(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        res=>{
          const index=this.dataSource.data.indexOf(id);
          this.dataSource.data.splice(index,1);
          this.dataSource._updateChangeSubscription();
          this.snackbar.open("Copy was deleted successfully", "Close", {
            duration: 2000,
          });
        },
        err=>{
          this.snackbar.open("An error has occured. Unable to delete book copy", "Close", {
            duration: 2000,
          });
        }
      );
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
