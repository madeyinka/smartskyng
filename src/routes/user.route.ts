import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from 'src/dashboard/user/booking/booking.component';

const user_routes: Routes = [
  {path: 'booking', component:BookingComponent}
]

@NgModule({
  imports: [RouterModule.forChild(user_routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
