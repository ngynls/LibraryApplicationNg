import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BookCopy } from 'src/app/shared/models/book-copy.model';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { FormControl } from '@angular/forms';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { MemberService } from 'src/app/shared/services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { ReservationService } from 'src/app/shared/services/reservation.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  reservationToEdit={
    copyId: '',
    memberId: ''
  };
  bookCopies:BookCopy[];
  filteredCopies:Observable<any[]>;
  members: LibraryMember[];
  filteredMembers: Observable<any[]>;
  copyIdControl=new FormControl();
  memberIdControl=new FormControl();

  constructor(private reservationService:ReservationService, private copyService:BookCopyService, private memberService:MemberService,
  private router:Router, private route:ActivatedRoute, private snackbar:MatSnackBar, private location:Location) { }

  ngOnInit() {
    this.reservationService.getReservation(this.route.snapshot.params['id']).subscribe((data:Reservation)=>{
      this.reservationToEdit=data;
      console.log(this.reservationToEdit);
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
    this.reservationToEdit.copyId=this.copyIdControl.value;
    this.reservationToEdit.memberId=this.memberIdControl.value;
    this.reservationService.updateReservation(this.route.snapshot.params['id'], this.reservationToEdit).subscribe((res)=>{
      console.log(res);
    });
    this.location.back();
    this.snackbar.open("Reservation was edited successfully", "Close", {
      duration: 2000,
    });
  }

}
