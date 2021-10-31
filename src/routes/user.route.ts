import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from 'src/dashboard/user/bookings/booking/booking.component';
import { ConfirmComponent } from 'src/dashboard/user/bookings/confirm/confirm.component';
import { SummaryComponent } from 'src/dashboard/user/bookings/summary/summary.component';
import { InvoicesComponent } from 'src/dashboard/user/invoices/invoices.component';
import { PaymentComponent } from 'src/dashboard/user/payment/payment.component';
import { QuotesComponent } from 'src/dashboard/user/quotes/quotes.component';

const user_routes: Routes = [
  {path: 'bookings', component:BookingComponent},
  {path: 'booking/create', component:BookingComponent},
  {path: 'booking/summary/:id', component:SummaryComponent},
  {path: 'booking/confirm/:id', component:ConfirmComponent},
  {path: 'booking/modify/:id', component:BookingComponent},
  {path: 'booking/list', component:QuotesComponent},
  {path: 'booking/checkout/:id', component:PaymentComponent},
  {path: 'invoices', component:InvoicesComponent}
]

@NgModule({
  imports: [RouterModule.forChild(user_routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
