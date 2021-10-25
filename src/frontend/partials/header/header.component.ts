import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../services/http.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private http: HttpService,
    private router: Router
  ) { }
  isActive:Boolean = false
  ngOnInit() {
    this.isLogged()
  }

  isLogged() {
    const user = this.http.getUser()
    if (user && user != null) {
      this.isActive = true
    }
  }

  logOut() {
    localStorage.remove('token')
    localStorage.remove('id')
    this.isActive = false
    this.router.navigate(['main/index'])
  }
}
