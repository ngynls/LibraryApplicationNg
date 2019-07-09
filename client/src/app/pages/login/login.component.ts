import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminCredentials={
    username: '',
    password: ''
  }

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    console.log(form.value);
  }

}
