import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { HttpService } from '../../../../services/http.service'
import { Booking } from '../../../../model/booking'

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: Booking

  constructor(
    private router:Router,
    private http:HttpService
  ) { }

  ngOnInit() {
    this.getBooking()
  }

  getBooking(){
    const user = this.http.getUser()
    if (user) {
      this.http.get('booking/pull?user='+user).subscribe(
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
