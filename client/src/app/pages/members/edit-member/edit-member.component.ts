import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { MemberService } from 'src/app/shared/services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  memberToEdit:LibraryMember;

  constructor(private memberService:MemberService, private router:Router, private route:ActivatedRoute, private location:Location, private snackbar:MatSnackBar ) { }

  ngOnInit() {
    this.memberService.getMember(this.route.snapshot.params['id']).subscribe((data:LibraryMember)=>{
      this.memberToEdit=data;
      console.log(this.memberToEdit);
    });
  }

  onSubmit(form:NgForm){
    this.memberService.updateMember(this.route.snapshot.params['id'], form.value).subscribe((res)=>{
      console.log(res);
    });
    this.location.back();
    this.snackbar.open("Member was edited successfully", "Close", {
      duration: 2000,
    });
  }
}
