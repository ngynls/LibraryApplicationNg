import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { MemberService } from 'src/app/shared/services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit, OnDestroy {

  memberToEdit:LibraryMember;
  ngUnsubscribe = new Subject<void>();

  constructor(private memberService:MemberService, private router:Router, private route:ActivatedRoute, private location:Location, private snackbar:MatSnackBar ) { }

  ngOnInit() {
    this.memberService.getMember(this.route.snapshot.params['id']).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:LibraryMember)=>{
      this.memberToEdit=data;
      console.log(this.memberToEdit);
    },
    (err)=>{
      console.log(err);
    });
  }

  onSubmit(form:NgForm){
    this.memberService.updateMember(this.route.snapshot.params['id'], form.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res)=>{
      console.log(res);
    },
    (err)=>{
      console.log(err);
    });
    this.location.back();
    this.snackbar.open("Member was edited successfully", "Close", {
      duration: 2000,
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
