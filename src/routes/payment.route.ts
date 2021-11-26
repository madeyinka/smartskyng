import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropOffComponent } from 'src/dashboard/admin/pages/drop-off/drop-off.component';

const payment_routes: Routes = [
  {
    path: 'drop-off',
    component:DropOffComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(payment_routes)],
  exports: [RouterModule]
})

export class PaymentRoutingModule { }
