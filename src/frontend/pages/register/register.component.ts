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

   states:any = []
   lgas:any = []
   registerForm: FormGroup
   formErrors:any = {};
   user:User
   error:Boolean
   msg:string
   btn_msg:string = 'Submit'

  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.http.get_states().subscribe(data => {
      this.states = data.json_states
    })
    this.formValidator()
  }

  //error checker
  logFormErrors(group: FormGroup = this.registerForm): void {
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

  //get form control
  get f () {
    return this.registerForm.controls;
  }

  //formdata
  userData() {
    return this.user = {
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      email: this.f.email.value,
      password: this.f.password.value,
      address: this.f.address.value,
      organisation: this.f.organisation.value,
      state: this.f.state.value,
      lga: this.f.lga.value,
      phone: this.f.phone.value,
      status:"active"
    }
  }

  formValidator(){
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname:['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      organisation: [''],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      password:['', Validators.required],
      c_password:['', Validators.required]
    },
    {
      validator: [Utility.MatchPassword("password", "c_password")]
    })
  }

  onSubmit(){
    this.btn_msg = 'Sending...'
    this.http.post('auth/register', this.userData()).subscribe(
      (data) => {
        if (!data.error) {
          this.error = data.error
          this.msg = data.message
          this.btn_msg = 'Submit'
          this.router.navigate(['main/auth/login'])
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
