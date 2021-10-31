import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import {HttpService}from './../../../../services/http.service'
import { validationMessages, Utility } from './../../../../utilities'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formErrors:any = {};
  userForm:FormGroup
  states:any = []
  lgas:any = []
  user:any
  msg:string
  btn_msg:string = 'Register Account'
  error:boolean

  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.http.get_states().subscribe(data => {
      this.states = data.json_states
    })
    this.user_validator()
  }

  //error checker
  logFormErrors(group:FormGroup = this.userForm): void {
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

  onSelect(state:string){
    this.http.get_states().subscribe(data => {
      const lga = data.json_states.find(s => s.alias === state)
      return this.lgas = lga.lgas
    })
  }

  user_validator() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone:['', Validators.required],
      address:['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]],
      c_password:['', Validators.required],
      state: [''],
      lga: ['']
    },
    {
      validator: [Utility.MatchPassword("password", "c_password")]
    })
  }

  get f () {
    return this.userForm.controls
  }

  userData() {
    return this.user = {
      name: this.f.name.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      address: this.f.address.value,
      password: this.f.password.value,
      state: this.f.state.value,
      lga: this.f.lga.value,
      type:"individual"
    }
  }

  onSubmit(){
    this.btn_msg = 'Sending Data...'
    this.http.post('auth/register', this.userData()).subscribe(
      (data) => {
        if (!data.error) {
          this.error = data.error
          this.msg = data.message
          this.btn_msg = 'Register Account'
          this.router.navigate(['main/index'])
        } else {
          this.error = data.error
          this.msg = data.message
          this.btn_msg = 'Error sending data'
        }
      },
      (err) => {console.log(err)}
    )
  }

}
