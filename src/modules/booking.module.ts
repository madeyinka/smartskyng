import { NgModule } from '@angular/core'
import { BookingRoutingModule } from './../routes/booking.route'
import { BookingComponent } from './../frontend/pages/booking/booking.component'
import { SummaryComponent } from './../frontend/pages/summary/summary.component'
import { SharedModule } from './shared.module'

@NgModule({
  declarations:[
    BookingComponent,
    SummaryComponent
  ],
  imports:[
    SharedModule,
    BookingRoutingModule
  ]
})

export class BookingModule { }
