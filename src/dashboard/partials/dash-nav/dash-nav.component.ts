import { Component, OnInit } from '@angular/core';
import {HttpService} from './../../../services/http.service'

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent implements OnInit {

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
