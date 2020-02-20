import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { BookService } from '../../../shared/services/book.service';
import { ActivatedRoute  } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Publisher } from 'src/app/shared/models/publisher.model';
import { PublisherService } from 'src/app/shared/services/publisher.service';
import { Genre } from 'src/app/shared/models/genre.model';
import { GenreService } from 'src/app/shared/services/genre.service';
import { Observable } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/shared/models/book.model';
import { Subject } from 'rxjs';
import { AuthorService } from 'src/app/shared/services/author.service';
import { Author } from 'src/app/shared/models/author.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit, OnDestroy {

  bookToEdit={
    title: '',
    isbn: '',
    authors:[],
    publishedYear: 0,
    nbOfPages: 0,
    language: '',
    edition: '',
    summary: '',
    cover: '',
    locationInLibrary: '',
    publisher: '',
    genre: '',
  };
  authorControl= new FormControl();
  genreControl = new FormControl();
  publisherControl = new FormControl();
  authors:Author[];
  filteredAuthors:Observable<Author[]>;
  publishers: Publisher[];
  filteredPublishers: Observable<Publisher[]>;
  genres: Genre[];
  filteredGenres: Observable<Genre[]>;
  addOnBlur: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ngUnsubscribe = new Subject<void>();

  constructor(private bookService:BookService, private genreService:GenreService, private publisherService:PublisherService, private authorService:AuthorService,
    private route:ActivatedRoute, private location:Location, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.bookService.getBook(this.route.snapshot.params['id']).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Book)=>{
      this.bookToEdit=data;
    },
    (err)=>{
      console.log(err);
    });
    this.authorService.getAuthors().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Author[])=>{
      this.authors=data;
      this.filteredAuthors = this.authorControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.firstName),
        map(firstName => firstName ? this.filterAuthor(firstName) : this.authors.slice())
      );
    });
    this.genreService.getGenres().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Genre[])=>{
      this.genres=data;
      this.filteredGenres = this.genreControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.genreName),
        map(genreName => genreName ? this.filterGenre(genreName) : this.genres.slice())
      );
    },
    (err)=>{
      console.log(err);
    });
    this.publisherService.getPublishers().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Publisher[])=>{
      this.publishers=data;
      this.filteredPublishers = this.publisherControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.publisherName),
        map(publisherName => publisherName ? this.filterPublisher(publisherName) : this.publishers.slice())
      );
    },
    (err)=>{
      console.log(err);
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

  selectedAuthor(event: MatAutocompleteSelectedEvent): void{
    this.bookToEdit.authors.push(event.option.value);
  }

  deleteAuthor(id:string){
    const authorToDelete=this.bookToEdit.authors.indexOf(id);
    this.bookToEdit.authors.splice(authorToDelete, 1);
  }

  onSubmit(){
    this.bookToEdit.publisher=this.publisherControl.value;
    this.bookToEdit.genre=this.genreControl.value;
    this.bookService.editBook(this.route.snapshot.params['id'], this.bookToEdit).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res=>{
       this.location.back();
       this.snackbar.open("Book was edited successfully", "Close", {
         duration: 2000,
       });
      },
      err=>{
       this.location.back();
       this.snackbar.open("Unable to edit book", "Close", {
         duration: 2000,
       });
      }
     );
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
