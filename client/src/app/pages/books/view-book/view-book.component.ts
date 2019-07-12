import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from '../../../shared/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  currentBook:Book;
  copies: BookCopy[];
  dataSource: MatTableDataSource<BookCopy>;
  displayedColumns: string[] = ['copyName', 'status', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookService: BookService, private copyService:BookCopyService, private router:Router,private route:ActivatedRoute) { }

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

}
