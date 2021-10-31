import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import {HttpService}from './../../../../services/http.service'
import { validationMessages, Utility } from './../../../../utilities'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  formErrors:any = {};
  orgForm:FormGroup
  company:any
  msg:string
  btn_msg:string = 'Register Account'
  error:boolean

  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.org_validator()
    this.orgForm.valueChanges.subscribe(() => this.logFormErrors())
  }

  //error checker
  logFormErrors(group:FormGroup = this.orgForm): void {
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

  org_validator() {
    this.orgForm = this.fb.group({
      name: ['', Validators.required],
      organisation: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['', Validators.required],
      address:['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]],
      c_password:['', Validators.required],
    },
    {
      validator: [Utility.MatchPassword("password", "c_password")]
    })
  }

  get f () {
    return this.orgForm.controls
  }

  companyData() {
    return this.company = {
      name: this.f.name.value,
      organisation: this.f.organisation.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      password: this.f.password.value,
      address: this.f.address.value,
      type:"organisation"
    }
  }

  onSubmit(){
    this.btn_msg = 'Sending Data...'
    this.http.post('auth/register', this.companyData()).subscribe(
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
