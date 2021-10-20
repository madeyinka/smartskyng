import { NgModule } from '@angular/core'
import { UserRoutingModule } from './../routes/user.route'
import { BookingComponent } from './../dashboard/user/booking/booking.component'
import { DashboardModule } from './dashboard.module'

@NgModule({
  declarations:[
    BookingComponent
  ],
  imports:[
    DashboardModule,
    UserRoutingModule
  ]
})

export class UserModule { }
