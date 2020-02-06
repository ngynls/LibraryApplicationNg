import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Publisher } from 'src/app/shared/models/publisher.model';
import { PublisherService } from 'src/app/shared/services/publisher.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit, OnDestroy {

  publishers:Publisher[];
  displayedColumns: string[] = ['publisherName', 'location', 'edit', 'delete'];
  dataSource: MatTableDataSource<Publisher>;
  ngUnsubscribe = new Subject<void>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private publisherService: PublisherService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.publisherService.getPublishers().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Publisher[])=>{
      this.publishers=data;
      this.dataSource=new MatTableDataSource<Publisher>(this.publishers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    err=>{
      console.log(err);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToAddPublisher(){
    this.router.navigateByUrl('/addPublisher');
  }

  deletePublisher(id, publisher){
    if(window.confirm(`Are you sure you want to delete this publisher? [${publisher.publisherName}]`)){
      this.publisherService.deletePublisher(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        res=>{
          const index=this.dataSource.data.indexOf(id);
          this.dataSource.data.splice(index,1);
          this.dataSource._updateChangeSubscription();
          this.snackbar.open("Publisher was deleted successfully", "Close", {
            duration: 2000,
          });
        },
        err=>{
          this.snackbar.open("An error has occured. Unable to delete publisher", "Close", {
            duration: 2000,
          });
        }
      );
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
