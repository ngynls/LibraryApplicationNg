import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { BookService } from '../../../shared/services/book.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Publisher } from 'src/app/shared/models/publisher.model';
import { PublisherService } from 'src/app/shared/services/publisher.service';
import { Genre } from 'src/app/shared/models/genre.model';
import { GenreService } from 'src/app/shared/services/genre.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookToAdd={
    title: '',
    isbn: '',
    authors: [],
    publishedYear: 0,
    nbOfPages: 0,
    language: '',
    edition: '',
    summary: '',
    cover: '',
    locationInLibrary: '',
    publisher: '',
    genre: '',
    copies: []
  }
  authorToAdd='';
  genreControl = new FormControl();
  publisherControl = new FormControl();
  publishers: Publisher[];
  filteredPublishers: Observable<any[]>;
  genres: Genre[];
  filteredGenres: Observable<any[]>;

  constructor(private bookService:BookService, private genreService:GenreService, private publisherService:PublisherService,
   private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    //get all the genre & publisher data for autocomplete fields
    this.genreService.getGenres().subscribe((data:Genre[])=>{
      this.genres=data;
      console.log(this.genres);
      this.filteredGenres = this.genreControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.genreName),
        map(genreName => genreName ? this.filterGenre(genreName) : this.genres.slice())
      );
    });
    this.publisherService.getPublishers().subscribe((data:Publisher[])=>{
      this.publishers=data;
      console.log(this.publishers);
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

  addAuthor(){
    this.bookToAdd.authors.push(this.authorToAdd);
    this.authorToAdd='';
  }

  deleteAuthor(id:string){
    const authorToDelete=this.bookToAdd.authors.indexOf(id);
    this.bookToAdd.authors.splice(authorToDelete, 1);
  }

  onSubmit(){
    this.bookToAdd.publisher=this.publisherControl.value;
    this.bookToAdd.genre=this.genreControl.value;
    console.log(this.bookToAdd);
    this.bookToAdd={
      title: '',
      isbn: '',
      authors: [],
      publishedYear: 0,
      nbOfPages: 0,
      language: '',
      edition: '',
      summary: '',
      cover: '',
      locationInLibrary: '',
      publisher: '',
      genre: '',
      copies: []
    }
  }

}
