import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { MemberService } from 'src/app/shared/services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookOnLoan } from 'src/app/shared/models/book-on-loan.model';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { LoanedBookService } from 'src/app/shared/services/loaned-book.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit, OnDestroy {

  currentMember:LibraryMember;
  loans:BookOnLoan[];
  reservations:Reservation[];
  dataSource: MatTableDataSource<BookOnLoan>;
  dataSourceReservations: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['copyId', 'dateIssued', 'dueDate', 'status'];
  displayedColumnsReservations: string[] = ['copyName', 'dateRequested'];
  ngUnsubscribe = new Subject<void>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) paginatorReservations: MatPaginator;

  constructor(private memberService:MemberService, private route:ActivatedRoute, private loanedBookService:LoanedBookService, private reservationService:ReservationService) { }

  ngOnInit() {
    this.memberService.getMember(this.route.snapshot.params['id']).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:LibraryMember)=>{
      this.currentMember=data;
    },
    err =>{
      console.log(err);
    });
    this.loanedBookService.getLoanedBooksForUser(this.route.snapshot.params['id']).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:BookOnLoan[])=>{
      this.loans=data;
      this.dataSource=new MatTableDataSource<BookOnLoan>(this.loans);
      this.dataSource.paginator = this.paginator;
    },
    (err)=>{
      console.log(err);
    });
    this.reservationService.getReservationsForUser(this.route.snapshot.params['id']).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Reservation[])=>{
      this.reservations=data;
      this.dataSourceReservations=new MatTableDataSource<Reservation>(this.reservations);
      this.dataSourceReservations.paginator= this.paginatorReservations;
    });
  }

  getStatus(dueDate:Date): string{
    const currentDate=new Date();
    if(currentDate > dueDate){
      return "Late";
    }
    else{
      return "On Time";
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
