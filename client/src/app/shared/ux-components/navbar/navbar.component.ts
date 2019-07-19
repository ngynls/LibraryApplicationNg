import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
  }

  isAuthenticated(){
    return this.auth.isAuthenticated();
  }

  logout(){
    this.auth.deleteToken();
    this.router.navigateByUrl('/login');
    this.snackbar.open("You have successfully logged out", "Close", {
      duration: 2000,
    });
  }

}
