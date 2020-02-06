import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { BookService } from 'src/app/shared/services/book.service';
import { MemberService } from 'src/app/shared/services/member.service';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { Book } from 'src/app/shared/models/book.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public nbOfCopies:number;
  public nbOfMembers: number;
  public nbOfBooks: number;
  public availableCopies:number;
  public loanedCopies: number;
  public reservedCopies: number;
  public pieChartLabels = ['Available', 'Loaned', 'Reserved'];
  public pieChartData= [];
  public pieChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  ngUnsubscribe = new Subject<void>();

  constructor(private copyService:BookCopyService, private bookService:BookService, private memberService:MemberService) { }

  ngOnInit() {
    this.memberService.getMembers().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:LibraryMember[])=>{
      this.nbOfMembers=data.length;
    },
    err =>{
      console.log(err);
    });
    this.bookService.getBooks().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:Book[])=>{
      this.nbOfBooks=data.length;
    },
    err =>{
      console.log(err);
    });
    this.copyService.getBookCopies().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:BookCopy[])=>{
      this.nbOfCopies=data.length;
      this.availableCopies=data.filter(copy => copy.status === 'Available').length;
      this.pieChartData.push(this.availableCopies);
      this.loanedCopies=data.filter(copy => copy.status === 'On loan').length;
      this.pieChartData.push(this.loanedCopies);
      this.reservedCopies=data.filter(copy => copy.status === 'Reserved').length;
      this.pieChartData.push(this.reservedCopies);
    },
    err=>{
      console.log(err);
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
