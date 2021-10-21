import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from 'src/dashboard/user/booking/booking.component';
import { InvoicesComponent } from 'src/dashboard/user/invoices/invoices.component';
import { QuotesComponent } from 'src/dashboard/user/quotes/quotes.component';

const user_routes: Routes = [
  {path: 'bookings', component:BookingComponent},
  {path:'quotes', component:QuotesComponent},
  {path:'invoices', component:InvoicesComponent}
]

@NgModule({
  imports: [RouterModule.forChild(user_routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
