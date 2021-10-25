import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  calculator:FormGroup
  total:number=0
  ship_cost:number=0
  charge_weight:number=0
  cost:number=200

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formValidator()
    this.calculator.valueChanges.subscribe(() => this.calculateCost())
  }

  chargable_weight(dim_weight, act_weight) {
    if (dim_weight >= act_weight) {
      this.charge_weight = dim_weight
    }else {
      this.charge_weight = act_weight
    }
    if (this.charge_weight < 20) {
      this.charge_weight = 20
    }
    return this.charge_weight
  }

  calculateCost(){
    const length = Number(this.f.length.value), width = Number(this.f.width.value), height=Number(this.f.height.value), weight= Number(this.f.weight.value), quantity = Number(this.f.count.value)
    const dim_weight = (length*width*height*quantity)/5000
    const act_weight = weight * quantity
    this.ship_cost = this.chargable_weight(dim_weight, act_weight) * this.cost
    const express = (this.f.express.value) ? this.ship_cost : 0
    //const insurance = (this.f.insurance.value) ? this.ship_cost : 0
    //const packaging = (this.f.packaging.value) ? this.ship_cost : 0
    this.total = this.ship_cost + express
  }

  get f () {
    return this.calculator.controls;
  }

  formValidator() {
    this.calculator = this.fb.group({
      count: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      length:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      width: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      height:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      weight:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      express:[],
      insurance:[],
      packaging:[]
    })
  }

}
