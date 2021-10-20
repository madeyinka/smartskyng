import { Component, OnInit } from '@angular/core';
import {HttpService} from './../../../services/http.service'

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit {

  user:any

  constructor(
    private http:HttpService
  ) { }

  ngOnInit() {
    const id = this.http.getUser()
    if (id) {
      this.http.get('user/by-identity?identity='+id).subscribe((data) => {
        this.user = data.response
      })
    }
  }

}
