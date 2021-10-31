import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import {HttpService}from './../../../../services/http.service'
import { validationMessages, Utility } from './../../../../utilities'

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  formErrors:any = {};
  agentForm:FormGroup
  agent:any
  msg:string
  btn_msg:string = 'Register Account'
  error:boolean

  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.agent_validator()
    this.agentForm.valueChanges.subscribe(() => this.logFormErrors())
  }

  //error checker
  logFormErrors(group:FormGroup = this.agentForm): void {
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

  agent_validator() {
    this.agentForm = this.fb.group({
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
    return this.agentForm.controls
  }

  agentData() {
    return this.agent = {
      name: this.f.name.value,
      organisation: this.f.organisation.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      password: this.f.password.value,
      address: this.f.address.value,
      type:"agent"
    }
  }

  onSubmit(){
    this.btn_msg = 'Sending Data...'
    this.http.post('auth/register', this.agentData()).subscribe(
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
