import { NgModule } from '@angular/core'
import { UserRoutingModule } from './../routes/user.route'
import { BookingComponent } from './../dashboard/user/booking/booking.component'
import { QuotesComponent } from './../dashboard/user/quotes/quotes.component'
import { InvoicesComponent } from './../dashboard/user/invoices/invoices.component'
import { DashboardModule } from './dashboard.module'

@NgModule({
  declarations:[
    BookingComponent,
    QuotesComponent,
    InvoicesComponent
  ],
  imports:[
    DashboardModule,
    UserRoutingModule
  ]
})

export class UserModule { }
