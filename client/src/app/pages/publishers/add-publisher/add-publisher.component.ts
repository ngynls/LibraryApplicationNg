import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublisherService } from '../../../shared/services/publisher.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.scss']
})
export class AddPublisherComponent implements OnInit {

  publisherToAdd={
    publisherName: '',
    location: ''
  }

  constructor(private publisherService:PublisherService, private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.publisherService.addPublisher(form.value).subscribe(
     res=>{
      this.router.navigateByUrl('/publishers');
      this.snackbar.open("Publisher was added successfully", "Close", {
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
