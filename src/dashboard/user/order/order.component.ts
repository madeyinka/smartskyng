import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { HttpService } from '../../../services/http.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

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
      this.http.get('utility/get-orders?user='+user).subscribe(
        (data) => {
          console.log(data)
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
