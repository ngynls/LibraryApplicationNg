import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from '../../../shared/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  currentBook:Book;

  constructor(private bookService: BookService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.bookService.getBook(this.route.snapshot.params['id']).subscribe((data:Book)=>{
      this.currentBook=data;
    });
  }

}
