import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Genre } from '../../../shared/models/genre.model';
import { GenreService } from 'src/app/shared/services/genre.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.scss']
})
export class EditGenreComponent implements OnInit {

  genreToEdit={
    genreName: ''
  }

  constructor(private genreService:GenreService, private router:Router, private route:ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getGenreDetails(this.route.snapshot.params['id']);
  }

  getGenreDetails(id:string){
    this.genreService.getGenre(id).subscribe((genre:Genre)=>{
      this.genreToEdit=genre;
    });
  }

  onSubmit(form:NgForm){
    this.genreService.updateGenre(this.route.snapshot.params['id'], form.value).subscribe((res)=>{
      console.log(res);
    });
    this.router.navigateByUrl('/genres');
    this.snackbar.open("Genre was edited successfully", "Close", {
      duration: 2000,
    });
  }

}
