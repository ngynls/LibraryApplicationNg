import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenreService } from 'src/app/shared/services/genre.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent implements OnInit, OnDestroy {

  genreToAdd={
    genreName: ''
  }
  subscription:Subscription;

  constructor(private genreService:GenreService, private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.subscription=this.genreService.addGenre(form.value).subscribe(
     res=>{
      this.router.navigateByUrl('/genres');
      this.snackbar.open("Genre was added successfully", "Close", {
        duration: 2000,
      });
     },
     err=>{
      this.snackbar.open("Unable to add genre", "Close", {
        duration: 2000,
      });
     }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
