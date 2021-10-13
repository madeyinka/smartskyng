import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './../frontend/pages/booking/booking.component'
import { SummaryComponent } from './../frontend/pages/summary/summary.component'

const book_routes: Routes = [
  {
    path: '',
    component: BookingComponent
  },
  {
    path: 'summary/:id',
    component:SummaryComponent
  },
  {
    path: 'modify/:id',
    component:BookingComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(book_routes)],
  exports: [RouterModule]
})

export class BookingRoutingModule { }
