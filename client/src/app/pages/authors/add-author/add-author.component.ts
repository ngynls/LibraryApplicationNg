import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorService } from '../../../shared/services/author.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {

  authorToAdd={
    firstName: '',
    lastName: ''
  }

  constructor(private authorService:AuthorService, private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.authorService.addAuthor(form.value).subscribe(
     res=>{
      this.router.navigateByUrl('/authors');
      this.snackbar.open("Author was added successfully", "Close", {
        duration: 2000,
      });
     },
     err=>{
      this.snackbar.open("Unable to add author", "Close", {
        duration: 2000,
      });
     }
    );
  }

}