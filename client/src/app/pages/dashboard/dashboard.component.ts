import { Component, OnInit } from '@angular/core';
import { BookCopyService } from 'src/app/shared/services/book-copy.service';
import { BookCopy } from 'src/app/shared/models/book-copy.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private copies:BookCopy[];
  private availableCopies:number;
  private loanedCopies: number;
  private reservedCopies: number;
  public pieChartLabels = ['Available', 'Loaned', 'Reserved'];
  public pieChartData= [];
  public pieChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  constructor(private copyService:BookCopyService) { }

  ngOnInit() {
    this.copyService.getBookCopies().subscribe((data:BookCopy[])=>{
      this.availableCopies=data.filter(copy => copy.status === 'Available').length;
      this.pieChartData.push(this.availableCopies);
      this.loanedCopies=data.filter(copy => copy.status === 'On loan').length;
      this.pieChartData.push(this.loanedCopies);
      this.reservedCopies=data.filter(copy => copy.status === 'Reserved').length;
      this.pieChartData.push(this.reservedCopies);
    })
  }

}
