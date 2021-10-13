import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { v4 as uuidv4 } from 'uuid';
import {Booking} from './../../../model/booking'
import {HttpService}from './../../../services/http.service'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  shippingForm:FormGroup
  booking:Booking

  constructor(
    private fb:FormBuilder,
    private http:HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formValidator()
  }

  recipientGroup(){
    return this.fb.group({
      name:[''],
      email:[''],
      phone:[''],
      alt_phone:[''],
      address:['']
    })
  }

  get f () {
    return this.shippingForm.controls;
  }

  get r () {
    return this.shippingForm.get('reciever') as FormGroup
  }

  randNum() {
    return Math.floor(Math.random() * 89999999 + 100000)
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
    const express = (this.f.express.value === 'yes') ? 200 : 0
    const insurance = (this.f.insurance.value === 'yes') ? 200 : 0
    const packaging = (this.f.packaging.value === 'yes') ? 200 : 0
    const total = (this.chargable(this.dim_weight(), this.act_weight()) * 200) + express + insurance + packaging
    return total
  }

  bookingData() {
    return this.booking = {
      id: uuidv4(),
      order_id: this.randNum(),
      origin: this.f.origin.value,
      destination: this.f.destination.value,
      service_type: this.f.service_type.value,
      shiping_date: this.f.shiping_date.value,
      location: this.f.location.value,
      reciever: this.r.value,
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
      reciever:this.recipientGroup(),
      length:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      width:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      height:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      weight:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      quantity:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      express:[''],
      insurance:[''],
      packaging:['']
    })
  }

  onSubmit(){
    this.http.post('booking', this.bookingData()).subscribe(
      (data) => {
        if (data && data !== null) {
          this.router.navigate(['main/booking/summary', data.id])
        }
      }
    )
  }

}
