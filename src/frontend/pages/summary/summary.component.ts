import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from './../../../services/http.service'
import { Booking } from './../../../model/booking'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  booking:Booking
  quoteForm:FormGroup
  addedData:any

  constructor(
    private fb:FormBuilder,
    private http:HttpService,
    private router:Router,
    private _router:ActivatedRoute
  ) { }

  ngOnInit() {
    this.formValidator()
    this._router.paramMap.subscribe(param => {
      const id = param.get('id')
      this.http.get('booking/'+id).subscribe(data => {
        this.booking = data
      })
    })
  }

  get f () {
    return this.quoteForm.controls;
  }

  formData(){
    return this.addedData = {
      item: this.f.item.value,
      description: this.f.description.value,
      status:"active"
    }
  }

  formValidator(){
    this.quoteForm = this.fb.group({
      item:['', Validators.required],
      description:['']
    })
  }

  onSubmit(){
    // this.http.post('booking/'+ this.f.item.value, this.formData()).subscribe(
    //   (data) => {
    //     console.log(data)
    //     //this.router.navigate(['main/booking/order', data.id])
    //   }
    // )
  }

}
