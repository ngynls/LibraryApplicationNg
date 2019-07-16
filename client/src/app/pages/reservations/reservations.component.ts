import { Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations:Reservation[];
  displayedColumns: string[] = ['memberId', 'copyId', 'dateRequested', 'actions'];
  dataSource: MatTableDataSource<Reservation>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private reservationService:ReservationService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.reservationService.getReservations().subscribe((data:Reservation[])=>{
      this.reservations=data;
      this.dataSource=new MatTableDataSource<Reservation>(this.reservations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToAddReservation(){
    this.router.navigateByUrl('/addReservation');
  }

  deleteReservation(id){
    if(window.confirm(`Are you sure you want to delete this reservation?`)){
      this.reservationService.deleteReservation(id).subscribe(
        res=>{
          this.snackbar.open("Reservatuib was deleted successfully", "Close", {
            duration: 2000,
          });
        }
      );
      const index=this.dataSource.data.indexOf(id);
      this.dataSource.data.splice(index,1);
      this.dataSource._updateChangeSubscription();
    }
  }

}
