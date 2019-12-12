import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { MemberService } from 'src/app/shared/services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookOnLoan } from 'src/app/shared/models/book-on-loan.model';
import { LoanedBookService } from 'src/app/shared/services/loaned-book.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {

  currentMember:LibraryMember;
  loans:BookOnLoan[];
  dataSource: MatTableDataSource<BookOnLoan>;
  displayedColumns: string[] = ['copyId', 'dateIssued', 'dueDate'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private memberService:MemberService, private route:ActivatedRoute, private loanedBookService:LoanedBookService) { }

  ngOnInit() {
    this.memberService.getMember(this.route.snapshot.params['id']).subscribe((data:LibraryMember)=>{
      this.currentMember=data;
    },
    err =>{
      console.log(err);
    });
    this.loanedBookService.getLoanedBooksForUser(this.route.snapshot.params['id']).subscribe((data:BookOnLoan[])=>{
      this.loans=data;
      console.log(this.loans);
      this.dataSource=new MatTableDataSource<BookOnLoan>(this.loans);
      this.dataSource.paginator = this.paginator;
    },
    (err)=>{
      console.log(err);
    });
  }

}
