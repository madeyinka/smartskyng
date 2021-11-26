import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from './../../../services/http.service'

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  id:string
  invoice:any

  constructor(
    private http:HttpService,
    private router:Router,
    private _router:ActivatedRoute
  ) { }

  ngOnInit() {
    this._router.paramMap.subscribe(param => {
      this.id = param.get('id')
      if (this.id) {
        this.getBooking(this.id)
      }
    })
  }

  getBooking(id:string) {
    this.http.get('booking/by-identity?identity='+id).subscribe(
      (data) => {
        if (!data.error && data.response != null){
          this.http.get('utility/get-invoice?quote_id='+ data.response._id).subscribe(
            (inv) => {
              if (inv && !inv.error) {
                this.invoice = inv.response
              }
            }
          )
        }
      }
    )
  }

}
