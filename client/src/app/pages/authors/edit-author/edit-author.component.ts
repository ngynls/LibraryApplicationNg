import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Author } from '../../../shared/models/author.model';
import { AuthorService } from '../../../shared/services/author.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent implements OnInit, OnDestroy {

  authorToEdit:Author={
    _id: '',
    firstName: '',
    lastName: ''
  }
  ngUnsubscribe = new Subject<void>();

  constructor(private authorService:AuthorService, private router:Router, private route:ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getAuthorDetails(this.route.snapshot.params['id']);
  }

  getAuthorDetails(id){
    this.authorService.getAuthor(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((author:Author)=>{
      this.authorToEdit=author;
    },
    err =>{
      console.log(err);
    });
  }

  onSubmit(form:NgForm){
    this.authorService.editAuthor(this.route.snapshot.params['id'], form.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res)=>{
      this.router.navigateByUrl('/authors');
      this.snackbar.open("Author was edited successfully", "Close", {
        duration: 2000,
      });
    },
    err =>{
      this.snackbar.open("An error has occured. Unable to edit author", "Close", {
        duration: 2000,
      });
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
