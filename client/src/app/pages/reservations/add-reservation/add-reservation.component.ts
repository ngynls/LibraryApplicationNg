import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { FormControl } from '@angular/forms';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { MemberService } from 'src/app/shared/services/member.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from 'src/app/shared/services/reservation.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  reservationToAdd={
    copyId:'',
    memberId:''
  }
  bookCopies:BookCopy[];
  filteredCopies:Observable<any[]>;
  members: LibraryMember[];
  filteredMembers: Observable<any[]>;
  copyIdControl=new FormControl();
  memberIdControl=new FormControl();

  constructor(private reservationService:ReservationService, private copyService:BookCopyService, private memberService:MemberService,
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
    this.reservationToAdd.copyId=this.copyIdControl.value;
    this.reservationToAdd.memberId=this.memberIdControl.value;
    //console.log(this.reservationToAdd);
    this.reservationService.addReservation(this.reservationToAdd).subscribe(
      res=>{
       this.router.navigateByUrl('/reservations');
       this.snackbar.open("Book was reserved successfully", "Close", {
         duration: 2000,
       });
       this.reservationToAdd={
        copyId:'',
        memberId:'' }
      },
      err=>{
       console.log(err);
       this.snackbar.open("Unable to reserve book", "Close", {
         duration: 2000,
       });
      }
     );
  }
}
