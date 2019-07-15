import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { FormControl } from '@angular/forms';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { MemberService } from 'src/app/shared/services/member.service';
import { LoanedBookService } from 'src/app/shared/services/loaned-book.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-loaned-book',
  templateUrl: './add-loaned-book.component.html',
  styleUrls: ['./add-loaned-book.component.scss']
})
export class AddLoanedBookComponent implements OnInit {

  copyToAdd={
    copyId:'',
    memberId:''
  }
  bookCopies:BookCopy[];
  filteredCopies:Observable<any[]>;
  members: LibraryMember[];
  filteredMembers: Observable<any[]>;
  copyIdControl=new FormControl();
  memberIdControl=new FormControl();

  constructor(private loanedBookService:LoanedBookService, private copyService:BookCopyService, private memberService:MemberService,
    private router:Router, private snackbar:MatSnackBar ) { }

  ngOnInit() {
    this.copyService.getBookCopies().subscribe((data:BookCopy[])=>{
      this.bookCopies=data;
      console.log(this.bookCopies);
      this.filteredCopies = this.copyIdControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.copyName),
        map(copyName => copyName ? this.filterCopies(copyName) : this.bookCopies.slice())
      );
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
    this.copyToAdd.copyId=this.copyIdControl.value;
    this.copyToAdd.memberId=this.memberIdControl.value;
    console.log(this.copyToAdd);
    this.loanedBookService.addLoanedBook(this.copyToAdd).subscribe(
      res=>{
       this.router.navigateByUrl('/books');
       this.snackbar.open("Book copy was loaned successfully", "Close", {
         duration: 2000,
       });
       this.copyToAdd={
          copyId:'',
          memberId:''
        }
      },
      err=>{
       this.snackbar.open("Unable to loan book", "Close", {
         duration: 2000,
       });
      }
     );
  }

}
