import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../shared/models/author.model';
import { AuthorService } from '../../shared/services/author.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  authors: Author[];
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
  dataSource: MatTableDataSource<Author>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private authorService: AuthorService, private router:Router) { }

  ngOnInit() {
    this.authorService.getAuthors().subscribe((data: Author[])=>{
      console.log(data);
      this.authors=data;
      this.dataSource=new MatTableDataSource<Author>(this.authors);
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

  redirectToAddAuthor(){
    this.router.navigateByUrl('/addAuthor');
  }
}
