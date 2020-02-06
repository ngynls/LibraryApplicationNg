import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BookOnLoan } from '../../shared/models/book-on-loan.model'
import { LoanedBookService } from 'src/app/shared/services/loaned-book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loaned-books',
  templateUrl: './loaned-books.component.html',
  styleUrls: ['./loaned-books.component.scss']
})
export class LoanedBooksComponent implements OnInit, OnDestroy {

  loanedBooks:BookOnLoan[];
  displayedColumns: string[] = ['copyId', 'memberId', 'edit', 'delete'];
  dataSource: MatTableDataSource<BookOnLoan>;
  ngUnsubscribe = new Subject<void>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private loanedBookService:LoanedBookService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.loanedBookService.getLoanedBooks().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:BookOnLoan[])=>{
      this.loanedBooks=data;
      this.dataSource=new MatTableDataSource<BookOnLoan>(this.loanedBooks);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (err)=>{
      console.log(err);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToAddLoanedBooks(){
    this.router.navigateByUrl('/addLoanedBook');
  }

  deleteLoanedBook(id){
    if(window.confirm(`Are you sure you want to delete this loaned book?`)){
      this.loanedBookService.deleteLoanedBook(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        res=>{
          const index=this.dataSource.data.indexOf(id);
          this.dataSource.data.splice(index,1);
          this.dataSource._updateChangeSubscription();
          this.snackbar.open("Loaned book was deleted successfully", "Close", {
            duration: 2000,
          });
        },
        err=>{
          this.snackbar.open("An error has occured. Unable to delete loaned book", "Close", {
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
