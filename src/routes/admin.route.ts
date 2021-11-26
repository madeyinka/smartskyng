import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/dashboard/admin/pages/dashboard/dashboard.component';

const admin_routes: Routes = [
  {path: 'dashboard', component:DashboardComponent},
  {path: 'airport', loadChildren: () => import('./../modules/airport.module').then(m => m.AirportModule)},
  {path: 'payment', loadChildren: () => import('./../modules/payment.module').then(m => m.PaymentModule)}
]

@NgModule({
  imports: [RouterModule.forChild(admin_routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
