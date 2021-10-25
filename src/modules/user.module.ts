import { NgModule } from '@angular/core'
import { UserRoutingModule } from './../routes/user.route'
import { BookingComponent } from './../dashboard/user/booking/booking.component'
import { QuotesComponent } from './../dashboard/user/quotes/quotes.component'
import { InvoicesComponent } from './../dashboard/user/invoices/invoices.component'
import { DashboardModule } from './dashboard.module'
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations:[
    BookingComponent,
    QuotesComponent,
    InvoicesComponent
  ],
  imports:[
    DashboardModule,
    UserRoutingModule,
    Angular4PaystackModule.forRoot('pk_test_c613fc7d428a64fd1e5daea22f8380551b28c78e')
  ]
})

export class UserModule { }
