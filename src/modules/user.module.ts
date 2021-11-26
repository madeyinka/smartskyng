import { NgModule } from '@angular/core'
import { UserRoutingModule } from './../routes/user.route'
import { BookingComponent } from './../dashboard/user/bookings/booking/booking.component'
import { BookingListComponent } from './../dashboard/user/bookings/booking-list/booking-list.component'
import { SummaryComponent } from './../dashboard/user/bookings/summary/summary.component'
import { ConfirmComponent } from './../dashboard/user/bookings/confirm/confirm.component'
import { QuotesComponent } from './../dashboard/user/quotes/quotes.component'
import { InvoicesComponent } from './../dashboard/user/invoices/invoices.component'
import { OrderComponent } from './../dashboard/user/order/order.component'
import { PaymentComponent } from './../dashboard/user/payment/payment.component'
import { ShipmentsComponent } from './../dashboard/user/shipments/shipments.component'
import { CompleteComponent } from './../dashboard/user/complete/complete.component'
import { DashboardModule } from './dashboard.module'
import { Angular4PaystackModule } from 'angular4-paystack';
import { SharedModule } from './shared.module'

@NgModule({
  declarations:[
    BookingComponent,
    BookingListComponent,
    SummaryComponent,
    ConfirmComponent,
    QuotesComponent,
    InvoicesComponent,
    PaymentComponent,
    OrderComponent,
    ShipmentsComponent,
    CompleteComponent
  ],
  imports:[
    DashboardModule,
    SharedModule,
    UserRoutingModule,
    Angular4PaystackModule.forRoot('pk_test_c613fc7d428a64fd1e5daea22f8380551b28c78e')
  ]
})

export class UserModule { }
