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
  cost:number=200

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formValidator()
    this.calculator.valueChanges.subscribe(() => this.calculateCost())
  }

  calculateCost(){
    const length = Number(this.f.length.value), width = Number(this.f.width.value), height=Number(this.f.height.value), weight= Number(this.f.weight.value), quantity = Number(this.f.count.value)
    const dim_weight = (length*width*height*quantity)/5000
    const act_weight = weight * quantity
    if (dim_weight && act_weight) {
      if (dim_weight >= act_weight) {
        this.total = dim_weight * this.cost
      } else {
        this.total = act_weight * this.cost
      }
    }
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
