import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryMember } from '../../shared/models/library-member.model';
import { MemberService } from '../../shared/services/member.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: LibraryMember[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'view', 'delete'];
  dataSource: MatTableDataSource<LibraryMember>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private memberService:MemberService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.memberService.getMembers().subscribe((data: LibraryMember[])=>{
      this.members=data;
      this.dataSource=new MatTableDataSource<LibraryMember>(this.members);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToAddMember(){
    this.router.navigateByUrl('/addMember');
  }

  deleteMember(id, member){
    if(window.confirm(`Are you sure you want to delete this member? [${member.firstName} ${member.lastName}]`)){
      this.memberService.deleteMember(id).subscribe(
        res=>{
          this.snackbar.open("Member was deleted successfully", "Close", {
            duration: 2000,
          });
        }
      );
      const index=this.dataSource.data.indexOf(id);
      this.dataSource.data.splice(index,1);
      this.dataSource._updateChangeSubscription();
    }
  }

}
