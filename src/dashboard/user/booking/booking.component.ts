import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { HttpService } from '../../../services/http.service'
import { Booking } from '../../../model/booking'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking
  total: number
  current: number
  limit: number
  per_page:number
  pages:number

  constructor(
    private router:Router,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.getBooking()
  }

  getBooking(){
      const user = this.http.getUser()
      if (user) {
        this.http.get('booking/pull?user='+user+'&status=pending').subscribe(
          (data) => {
            if (!data.error) {
              if (data.total > 0) {
                this.bookings = data.response
              } else{
                this.bookings = null
              }
            }else{
              this.router.navigate(['main/auth/login'])
            }
          }, (err) => {
            this.router.navigate(['main/auth/login'])
          }
        )
      }
  }
}
