import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { FormControl } from '@angular/forms';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { MemberService } from 'src/app/shared/services/member.service';
import { LoanedBookService } from 'src/app/shared/services/loaned-book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookOnLoan } from 'src/app/shared/models/book-on-loan.model';

@Component({
  selector: 'app-edit-loaned-book',
  templateUrl: './edit-loaned-book.component.html',
  styleUrls: ['./edit-loaned-book.component.scss']
})
export class EditLoanedBookComponent implements OnInit {

  copyToEdit={
    copyId: '',
    memberId: ''
  };
  bookCopies:BookCopy[];
  filteredCopies:Observable<any[]>;
  members: LibraryMember[];
  filteredMembers: Observable<any[]>;
  copyIdControl=new FormControl();
  memberIdControl=new FormControl();

  constructor(private loanedBookService:LoanedBookService, private copyService:BookCopyService, private memberService:MemberService,
    private router:Router, private route:ActivatedRoute, private location:Location, private snackbar:MatSnackBar ) { }

  ngOnInit() {
    this.loanedBookService.getLoanedBook(this.route.snapshot.params['id']).subscribe((dataToEdit:BookOnLoan)=>{
      this.copyToEdit=dataToEdit;
    },
    err =>{
      console.log(err);
    });
    this.copyService.getBookCopies().subscribe((data:BookCopy[])=>{
      this.bookCopies=data;
      console.log(this.bookCopies);
      this.filteredCopies = this.copyIdControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.copyName),
        map(copyName => copyName ? this.filterCopies(copyName) : this.bookCopies.slice())
      );
    },
    (err)=>{
      console.log(err);
    });
    this.memberService.getMembers().subscribe((data:LibraryMember[])=>{
      this.members=data;
      console.log(this.members);
      this.filteredMembers = this.memberIdControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.firstName),
        map(firstName => firstName ? this.filterMembers(firstName) : this.members.slice())
      );
    },
    (err)=>{
      console.log(err);
    });
  }

  private filterCopies(value: string): BookCopy[] {
    const filterValue = value.toLowerCase();
    return this.bookCopies.filter(option => option.copyName.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterMembers(value: string): LibraryMember[] {
    const filterValue = value.toLowerCase();
    return this.members.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  displayCopyId(copy?: BookCopy): string | undefined {
    return copy ? copy._id : undefined;
  }

  displayMemberId(member?: LibraryMember): string | undefined {
    return member ? member._id : undefined;
  }

  onSubmit(){
    this.copyToEdit.copyId=this.copyIdControl.value;
    this.copyToEdit.memberId=this.memberIdControl.value;
    console.log(this.copyToEdit);
    this.loanedBookService.updateLoanedBook(this.route.snapshot.params['id'], this.copyToEdit).subscribe((res)=>{
      console.log(res);
    },
    (err)=>{
      console.log(err);
    });
    this.location.back();
    this.snackbar.open("Loaned book was edited successfully", "Close", {
      duration: 2000,
    });
  }

}
