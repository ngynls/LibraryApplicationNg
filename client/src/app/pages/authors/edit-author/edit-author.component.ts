import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorService } from '../../../shared/services/author.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent implements OnInit {

  authorToEdit:any={
    firstName: '',
    lastName: ''
  }

  constructor(private authorService:AuthorService, private router:Router, private route:ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getAuthorDetails(this.route.snapshot.params['id']);
  }

  getAuthorDetails(id){
    this.authorService.getAuthor(id).subscribe((author)=>{
      this.authorToEdit=author;
    });
  }

}
