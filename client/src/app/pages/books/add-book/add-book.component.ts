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
import { Author } from 'src/app/shared/models/author.model';
import { AuthorService } from 'src/app/shared/services/author.service';

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
  authorControl= new FormControl();
  publishers: Publisher[];
  filteredPublishers: Observable<any[]>;
  genres: Genre[];
  filteredGenres: Observable<any[]>;
  authors: Author[];
  filteredAuthors: Observable<any[]>;

  constructor(private bookService:BookService, private genreService:GenreService, private publisherService:PublisherService, private authorService:AuthorService,
   private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    //get all the authors, genres & publishers data for autocomplete fields
    this.authorService.getAuthors().subscribe((data:Author[])=>{
      this.authors=data;
      console.log(this.authors);
      this.filteredAuthors = this.authorControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.firstName),
        map(firstName => firstName ? this.filterAuthor(firstName) : this.authors.slice())
      );
    })
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

  private filterAuthor(value: string): Author[] {
    const filterValue = value.toLowerCase();
    return this.authors.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterGenre(value: string): Genre[] {
    const filterValue = value.toLowerCase();
    return this.genres.filter(option => option.genreName.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterPublisher(name: string): Publisher[] {
    const filterValue = name.toLowerCase();
    return this.publishers.filter(option => option.publisherName.toLowerCase().indexOf(filterValue) === 0);
  }

  displayAuthorId(author?: Author): string | undefined {
    return author ? author._id : undefined;
  }

  displayGenreId(genre?: Genre): string | undefined {
    return genre ? genre._id : undefined;
  }

  displayPublisherId(publisher?: Publisher): string | undefined {
    return publisher ? publisher._id : undefined;
  }

  addAuthor(){
    this.bookToAdd.authors.push(this.authorControl.value);
  }

  deleteAuthor(id:string){
    const authorToDelete=this.bookToAdd.authors.indexOf(id);
    this.bookToAdd.authors.splice(authorToDelete, 1);
  }

  onSubmit(){
    this.addAuthor();
    this.bookToAdd.publisher=this.publisherControl.value;
    this.bookToAdd.genre=this.genreControl.value;
    console.log(this.bookToAdd);
    this.bookService.addBook(this.bookToAdd).subscribe(
      res=>{
       this.router.navigateByUrl('/books');
       this.snackbar.open("Book was added successfully", "Close", {
         duration: 2000,
       });
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
        copies: []}
      },
      err=>{
       this.snackbar.open("Unable to add book", "Close", {
         duration: 2000,
       });
      }
     );
  }

}
