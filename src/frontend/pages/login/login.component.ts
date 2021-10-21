import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import {HttpService}from './../../../services/http.service'
import { validationMessages, Utility } from './../../../utilities'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  formErrors:any = {};
  user:any
  error:Boolean
  msg:String
  btn_msg:string = 'Submit'

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formValidator()
  }

  //error checker
  logFormErrors(group: FormGroup = this.loginForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logFormErrors(abstractControl)
      }else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
         && (abstractControl.touched || abstractControl.dirty)) {
             const messages = validationMessages[key];
             for (const errorKey in abstractControl.errors) {
               if (errorKey) {
                 this.formErrors[key] += messages[errorKey] + ' ';
               }
            }
          }
      }
    });
  }

  //get controls
  get f () {
    return this.loginForm.controls
  }

  userData() {
    return this.user = {
      email: this.f.email.value,
      password: this.f.password.value
    }
  }

  formValidator(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onSubmit() {
    this.btn_msg = 'Sending...'
    this.http.post('auth/login', this.userData()).subscribe(
      (data) => {
        if (!data.error) {
          this.error = data.error
          this.msg = data.message
          this.btn_msg = 'Submit'
          localStorage.setItem('token', data.response)
          this.http.get('auth/usercontext').subscribe((user) => {
            localStorage.setItem('id', user.response)
            this.router.navigate(['user/bookings'])
          })

        } else {
          this.error = data.error
          this.msg = data.message
          this.btn_msg = 'Submit'
        }
      },
      (err) => {console.log(err)}
    )
  }

}
