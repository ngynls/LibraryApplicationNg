import { Component, OnInit } from '@angular/core';
import { LibraryMember } from 'src/app/shared/models/library-member.model';
import { MemberService } from 'src/app/shared/services/member.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {

  currentMember:LibraryMember;

  constructor(private memberService:MemberService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.memberService.getMember(this.route.snapshot.params['id']).subscribe((data:LibraryMember)=>{
      this.currentMember=data;
    });
  }



}
