import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { HttpService } from '../../../../services/http.service'
import { Airport } from '../../../../model/airport'

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {

  airports:Airport

  constructor(
    private router:Router,
    private http:HttpService
  ) { }

  ngOnInit() {
    this.getAirports()
  }

  getAirports() {
    this.http.get('airport/pull').subscribe(
      (data) => this.airports = data.response
    )
  }

}
