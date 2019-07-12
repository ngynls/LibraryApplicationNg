import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/services/member.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

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
  }

  constructor(private memberService:MemberService, private router:Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.memberToAdd);
  }

}
