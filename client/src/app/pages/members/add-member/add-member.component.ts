import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberService } from '../../../shared/services/member.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit, OnDestroy {

  memberToAdd={
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    postalCode: '',
    telephone: '',
    email: '',
    loans: [],
    reservations: []
  };
  subscription:Subscription;

  constructor(private memberService:MemberService, private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(){
    //console.log(this.memberToAdd);
    this.subscription=this.memberService.addMember(this.memberToAdd).subscribe(
      res=>{
       this.router.navigateByUrl('/members');
       this.snackbar.open("Member was added successfully", "Close", {
         duration: 2000,
       });
      },
      err=>{
       console.log(err);
       this.snackbar.open("Unable to add member", "Close", {
         duration: 2000,
       });
      }
     );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
