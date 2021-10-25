import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {HttpService} from './../../../services/http.service'

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent implements OnInit {

  user:any
  isActive:Boolean

  constructor(
    private http:HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.http.getUser()
    if (id) {
      this.http.get('user/by-identity?identity='+id).subscribe((data) => {
        this.user = data.response
      })
    }
  }

  logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.isActive = false
    this.router.navigate(['main/index'])
  }
//   public isRouteActive(route) {
//     return this.router.isRouteActive(this.router.generate(route))
// }


}
