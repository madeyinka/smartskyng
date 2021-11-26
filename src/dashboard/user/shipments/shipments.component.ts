import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { HttpService } from '../../../services/http.service'

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {

  orders:any

  constructor(
    private http:HttpService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getOrders()
  }

  getOrders() {
    const user = this.http.getUser()
    if (user) {
      this.http.get('utility/get-orders?status=complete&user='+user).subscribe(
        (data) => {
          if (!data.error) {
            if (data.total > 0) {
              this.orders = data.response
            } else{
              this.orders = null
            }
          }else{
            this.router.navigate(['main/index'])
          }
        }, (err) => {
          this.router.navigate(['main/index'])
        }
      )
    }
  }

}
