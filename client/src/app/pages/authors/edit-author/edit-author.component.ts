import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Author } from '../../../shared/models/author.model';
import { AuthorService } from '../../../shared/services/author.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent implements OnInit {

  authorToEdit:Author={
    _id: '',
    firstName: '',
    lastName: ''
  }

  constructor(private authorService:AuthorService, private router:Router, private route:ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getAuthorDetails(this.route.snapshot.params['id']);
  }

  getAuthorDetails(id){
    this.authorService.getAuthor(id).subscribe((author:Author)=>{
      console.log(author);
      this.authorToEdit=author;
    });
  }

  onSubmit(form:NgForm){
    this.authorService.editAuthor(this.route.snapshot.params['id'], form.value).subscribe((res)=>{
      //TODO: fix httperrorresponse (json parsing at index 0. possibly _id related)
      console.log(res);
    });
    this.router.navigateByUrl('/authors');
    this.snackbar.open("Author was edited successfully", "Close", {
      duration: 2000,
    });
  }

}
