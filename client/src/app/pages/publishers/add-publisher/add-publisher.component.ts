import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublisherService } from '../../../shared/services/publisher.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.scss']
})
export class AddPublisherComponent implements OnInit, OnDestroy {

  publisherToAdd={
    publisherName: '',
    location: ''
  };
  subscription:Subscription;

  constructor(private publisherService:PublisherService, private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.subscription=this.publisherService.addPublisher(form.value).subscribe(
     res=>{
      this.router.navigateByUrl('/publishers');
      this.snackbar.open("Publisher was added successfully", "Close", {
        duration: 2000,
      });
     },
     err=>{
      this.snackbar.open("An error has occured. Unable to add publisher", "Close", {
        duration: 2000,
      });
     }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
