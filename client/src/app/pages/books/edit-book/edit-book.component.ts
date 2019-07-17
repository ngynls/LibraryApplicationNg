import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookService } from '../../../shared/services/book.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Publisher } from 'src/app/shared/models/publisher.model';
import { PublisherService } from 'src/app/shared/services/publisher.service';
import { Genre } from 'src/app/shared/models/genre.model';
import { GenreService } from 'src/app/shared/services/genre.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Book } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  bookToEdit={
    title: '',
    isbn: '',
    publishedYear: 0,
    nbOfPages: 0,
    language: '',
    edition: '',
    summary: '',
    cover: '',
    locationInLibrary: '',
    publisher: '',
    genre: '',
  }
  genreControl = new FormControl();
  publisherControl = new FormControl();
  publishers: Publisher[];
  filteredPublishers: Observable<any[]>;
  genres: Genre[];
  filteredGenres: Observable<any[]>;

  constructor(private bookService:BookService, private genreService:GenreService, private publisherService:PublisherService,
    private router:Router, private route:ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.bookService.getBook(this.route.snapshot.params['id']).subscribe((data:Book)=>{
      this.bookToEdit=data;
      console.log(this.bookToEdit);
    });
    this.genreService.getGenres().subscribe((data:Genre[])=>{
      this.genres=data;
      this.filteredGenres = this.genreControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.genreName),
        map(genreName => genreName ? this.filterGenre(genreName) : this.genres.slice())
      );
    });
    this.publisherService.getPublishers().subscribe((data:Publisher[])=>{
      this.publishers=data;
      this.filteredPublishers = this.publisherControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.publisherName),
        map(publisherName => publisherName ? this.filterPublisher(publisherName) : this.publishers.slice())
      );
    });
  }

  private filterGenre(value: string): Genre[] {
    const filterValue = value.toLowerCase();
    return this.genres.filter(option => option.genreName.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterPublisher(name: string): Publisher[] {
    const filterValue = name.toLowerCase();
    return this.publishers.filter(option => option.publisherName.toLowerCase().indexOf(filterValue) === 0);
  }

  displayGenreId(genre?: Genre): string | undefined {
    return genre ? genre._id : undefined;
  }

  displayPublisherId(publisher?: Publisher): string | undefined {
    return publisher ? publisher._id : undefined;
  }

  onSubmit(){
    console.log(this.bookToEdit);
  }


}
