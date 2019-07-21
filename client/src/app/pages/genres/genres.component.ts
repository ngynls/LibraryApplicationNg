import { Component, OnInit, ViewChild } from '@angular/core';
import { Genre } from '../../shared/models/genre.model';
import { GenreService } from 'src/app/shared/services/genre.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres: Genre[];
  displayedColumns: string[] = ['genreName', 'edit', 'delete'];
  dataSource: MatTableDataSource<Genre>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private genreService: GenreService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe((data:Genre[])=>{
      this.genres=data;
      this.dataSource=new MatTableDataSource<Genre>(this.genres);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToAddGenre(){
    this.router.navigateByUrl('/addGenre');
  }

  deleteGenre(id, genre){
    if(window.confirm(`Are you sure you want to delete this genre? [${genre.genreName}]`)){
      this.genreService.deleteGenre(id).subscribe(
        res=>{
          this.snackbar.open("Genre was deleted successfully", "Close", {
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
