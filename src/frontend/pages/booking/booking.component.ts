import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import {Booking} from './../../../model/booking'
import {HttpService}from './../../../services/http.service'
import { validationMessages } from './../../../utilities'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  shippingForm:FormGroup
  booking:any
  formErrors:any = {};
  airports: any
  id: string
  btn_msg:string
  show:boolean = false

  constructor(
    private fb:FormBuilder,
    private http:HttpService,
    private router: Router,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formValidator()
    this._router.paramMap.subscribe(param => {
      this.id = param.get('id')
      if (this.id) {
        this.btn_msg = 'Modify Booking'
        this.getBooking(this.id)
      }else {
        this.btn_msg = 'Submit Booking'
        this.booking = {
          origin:'',
          destination:'',
          shiping_date:'',
          service_type:'',
          location:'',
          receiver: {
            name:'',
            email:'',
            phone:'',
            alt_phone:'',
            address:''
          },
          length:null,
          width:null,
          height:null,
          weight:null,
          quantity:null,
          express:'',
          insurance:'',
          packaging:''
        }
      }
    })
    this.http.get('airport/pull').subscribe(
      (data) => {
        this.airports = data.response
      }
    )
  }

  logFormErrors(group: FormGroup = this.shippingForm): void {
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

  onSelect(type) {
    if (type === 'pickup') {
      this.show = true
    }else{this.show = false}
  }

  getBooking(id:string) {
    this.http.get('booking/by-identity?identity='+id).subscribe((data) => {
      this.editBooking(data.response)
      this.booking = data.response
    })
  }

  editBooking(data:any) {
    this.shippingForm.patchValue({
      origin:data.origin,
      destination:data.destination,
      shiping_date:data.shiping_date,
      service_type:data.service_type,
      location:data.location,
      receiver:data.receiver,
      length:data.length,
      width:data.width,
      height:data.height,
      weight:data.weight,
      quantity:data.quantity,
      express:data.express,
      insurance:data.insurance,
      packaging:data.packaging
    })
  }

  mapFormValues() {
    this.booking.identity = this.id,
    this.booking.origin = this.f.origin.value,
    this.booking.destination = this.f.destination.value,
    this.booking.service_type = this.f.service_type.value,
    this.booking.shiping_date = this.f.shiping_date.value,
    this.booking.location = this.f.location.value,
    this.booking.receiver = this.r.value,
    this.booking.length = this.f.length.value,
    this.booking.width = this.f.width.value,
    this.booking.height = this.f.height.value,
    this.booking.weight = this.f.weight.value,
    this.booking.quantity = this.f.quantity.value,
    this.booking.express = this.f.express.value,
    this.booking.insurance = this.f.insurance.value,
    this.booking.packaging = this.f.packaging.value
  }

  recipientGroup(){
    return this.fb.group({
      name:['', Validators.required],
      email:['', Validators.required],
      phone:['', Validators.required],
      alt_phone:[''],
      address:['', Validators.required]
    })
  }

  get f () {
    return this.shippingForm.controls;
  }

  get r () {
    return this.shippingForm.get('receiver') as FormGroup
  }

  dim_weight() {
    const length = this.f.length.value
    const width = this.f.width.value
    const height =  this.f.height.value
    const quantity = this.f.quantity.value
    const dim_weight = (length * width * height * quantity)/5000
    return dim_weight
  }

  act_weight() {
    return this.f.weight.value * this.f.quantity.value
  }

  chargable(dim_weight:number, act_weight:number) {
    if (dim_weight >= act_weight) {
      return dim_weight
    } else {
      return act_weight
    }
  }

  calculateCost() {
    const charge_weight = (this.chargable(this.dim_weight(), this.act_weight()) <= 20) ? 20 : this.chargable(this.dim_weight(), this.act_weight())
    const ship_cost = ( charge_weight * 200)
    const express = (this.f.express.value) ? ship_cost : 0
    // const insurance = (this.f.insurance.value === 'yes') ? 200 : 0
    // const packaging = (this.f.packaging.value === 'yes') ? 200 : 0
    const total =  ship_cost + express
    return total
  }

  bookingData() {
    return this.booking = {
      origin: this.f.origin.value,
      destination: this.f.destination.value,
      service_type: this.f.service_type.value,
      shiping_date: this.f.shiping_date.value,
      location: this.f.location.value,
      receiver: this.r.value,
      length:Number(this.f.length.value),
      width:Number(this.f.width.value),
      height:Number(this.f.height.value),
      weight:Number(this.f.weight.value),
      quantity:Number(this.f.quantity.value),
      express:this.f.express.value,
      insurance:this.f.insurance.value,
      packaging:this.f.packaging.value,
      dim_weight:this.dim_weight(),
      act_weight:this.act_weight(),
      charge_weight:this.chargable(this.dim_weight(), this.act_weight()),
      cost:Number(this.calculateCost()),
      status:"pending",
      date_added:Date.now().toString()
    }
  }

  formValidator(){
    this.shippingForm = this.fb.group({
      origin:['', Validators.required],
      destination:['', Validators.required],
      shiping_date:['',Validators.required],
      service_type:['', Validators.required],
      location:['', Validators.required],
      receiver:this.recipientGroup(),
      length:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      width:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      height:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      weight:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      quantity:[1, [Validators.required, Validators.pattern("^[0-9]*$")]],
      express:[''],
      insurance:[''],
      packaging:['']
    })
  }

  onSubmit(){
    this.mapFormValues()
    if (this.booking.identity) {
      this.http.post('booking/modify', this.booking).subscribe(
        (data) => {
          if (data && !data.error ) {
            this.router.navigate(['main/booking/summary', data.response._id])
          }
        }
      )
    } else {
      this.http.post('booking/create', this.bookingData()).subscribe(
        (data) => {
          if (data && !data.error) {
            this.router.navigate(['main/booking/summary', data.response._id])
          }
        }, (err) => {
          this.router.navigate(['main/auth/login'])
        }
      )
    }
  }

}
