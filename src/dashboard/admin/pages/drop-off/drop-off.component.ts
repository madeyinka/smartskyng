import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from '../../../../services/http.service'
import { validationMessages } from './../../../../utilities'

@Component({
  selector: 'app-drop-off',
  templateUrl: './drop-off.component.html',
  styleUrls: ['./drop-off.component.css']
})
export class DropOffComponent implements OnInit {

  paymentForm:FormGroup
  formErrors:any = {}
  data:any

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private http:HttpService
  ) { }

  ngOnInit() {
    this.formValidation()
  }

  logFormErrors(group: FormGroup = this.paymentForm): void {
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

  genNumber = function (length:number) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  }

  get f () {
    return this.paymentForm.controls
  }

  formData(){
    return this.data = {
      invoice: this.f.invoice.value,
      trans:this.genNumber(10),
      reference:`${Math.random() * 10000000000000}`,
      status:"Paid"
    }
  }

  formValidation() {
    this.paymentForm = this.fb.group({
      invoice:['', Validators.required]
    })
  }

  onSubmit() {
    this.http.post('utility/payment-feedback', this.formData()).subscribe(
      (data) => console.log(data)
    )
  }

}
