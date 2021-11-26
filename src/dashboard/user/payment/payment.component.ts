import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from './../../../services/http.service'
import { PaystackOptions } from 'angular4-paystack';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  type:string
  payForm:FormGroup
  payData:any
  id:string
  options: PaystackOptions
  tRef=''
  title:string
  inv:any

  constructor(
    private fb:FormBuilder,
    private http:HttpService,
    private router:Router,
    private _router:ActivatedRoute
  ) { }

  ngOnInit() {
    this.setRandomPaymentRef();
    this.formValidator()
    this._router.paramMap.subscribe(param => {
      this.id = param.get('id')
      if (this.id) {
        this.http.get('invoice/by-identity?identity='+this.id).subscribe(
          (data) => this.inv = data.response
        )
      }
    })
  }

  paymentDone(ref: any) {
    if (ref.status == "success" && ref.message == "Approved") {
      const biil_info = {identity:this.id,status:"Paid",reference:ref.reference,trans:ref.trans,method:"card",email:this.inv.email}//email
      this.http.post('utility/generate-order', biil_info).subscribe(
        (data) => console.log(data)
      )
    }
  }

  setRandomPaymentRef() {
    this.tRef = `${Math.random() * 10000000000000}`;
  }

  method(type:string){
    switch(type) {
      case "dropoff":
        this.type = type
        break;
      case "paystack":
        this.type = type
        break;
      case "transfer":
        this.type = type
        break;
    }
  }

  formData() {
    return this.payData = {
      identity: this.id,
      method: this.payForm.controls.method.value,
      email:this.inv.email,
      status:"Unpaid",
      reference:this.setRandomPaymentRef()
    }
  }

  formValidator() {
    this.payForm = this.fb.group({
      method:['dropoff']
    })
  }

  onSubmit(){
    this.http.post('utility/generate-order', this.formData()).subscribe(
      (data) => {
        //if (data) {
          this.router.navigate(['user/order/complete', this.inv.quote_id])
       // }
      }
    )
  }

}
