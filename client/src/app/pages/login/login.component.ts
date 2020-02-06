import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  adminCredentials={
    username: '',
    password: ''
  };
  subscription:Subscription;

  constructor(private auth: AuthService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit() {
    if(this.auth.isAuthenticated)
      this.router.navigateByUrl('/dashboard');
  }

  onSubmit(form:NgForm){
    this.subscription=this.auth.login(form.value).subscribe(
      res =>{
        this.auth.setToken(res['token']);
        this.router.navigateByUrl('/dashboard');
        this.snackbar.open("You are now logged in!", "Close", {
          duration: 2000,
        });
      },
      err=> {
        this.snackbar.open(err.error.message, "Close", {
          duration: 2000,
        });
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
