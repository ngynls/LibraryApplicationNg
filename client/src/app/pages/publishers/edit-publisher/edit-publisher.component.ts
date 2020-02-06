import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Publisher } from '../../../shared/models/publisher.model';
import { PublisherService } from 'src/app/shared/services/publisher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.scss']
})
export class EditPublisherComponent implements OnInit, OnDestroy {

  publisherToEdit={
    publisherName: '',
    location: ''
  };
  ngUnsubscribe = new Subject<void>();

  constructor(private publisherService:PublisherService, private router:Router, private route:ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getPublisherDetails(this.route.snapshot.params['id']);
  }

  getPublisherDetails(id:string){
    this.publisherService.getPublisher(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((publisher:Publisher)=>{
      this.publisherToEdit=publisher;
    })
  }

  onSubmit(form:NgForm){
    this.publisherService.updatePublisher(this.route.snapshot.params['id'], form.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
    (res)=>{
      this.router.navigateByUrl('/publishers');
      this.snackbar.open("Publisher was edited successfully", "Close", {
        duration: 2000,
      });
    },
    (err)=>{
      this.router.navigateByUrl('/publishers');
      this.snackbar.open("An error has occured. Unable to edit publisher", "Close", {
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
