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

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    this.title = 'Payment failed';
    console.log(this.title);
  }

  setRandomPaymentRef() {
    this.tRef = `${Math.random() * 10000000000000}`;
  }

  ngOnInit() {
    this.setRandomPaymentRef();
    this.formValidator()
    this._router.paramMap.subscribe(param => {
      this.id = param.get('id')
      if (this.id) {
        this.http.get('utility/invoice-by-identity?identity='+this.id).subscribe(
          (data) => this.inv = data.response
        )
      }
    })
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
      method: this.payForm.controls.method.value
    }
  }

  formValidator() {
    this.payForm = this.fb.group({
      method:['dropoff']
    })
  }

  onSubmit(){
    this.http.post('utility/generate-order', this.formData()).subscribe(
      (data) => console.log(data.message)
    )
  }

}
