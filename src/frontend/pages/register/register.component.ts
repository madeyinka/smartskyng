import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import {HttpService}from './../../../services/http.service'
import { validationMessages, Utility } from './../../../utilities'
import { User } from './../../../model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  type:string

  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userType(this.type)
  }

  userType(type?) {
    switch(type) {
      case "individual":
        this.type = type
        break;
      case "organisation":
        this.type = type
        break;
      case "agent":
        this.type = type
        break;
      default:
        this.type = 'individual'
        break;
    }
  }

}
