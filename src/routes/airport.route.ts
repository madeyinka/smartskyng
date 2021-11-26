import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirportListComponent } from 'src/dashboard/admin/pages/airport-list/airport-list.component';
import { AirportComponent } from '../dashboard/admin/pages/airport/airport.component'

const airport_routes: Routes = [
  {
    path: 'create',
    component: AirportComponent
  },
  {
    path:'lists',
    component:AirportListComponent
  },
  {
    path: 'modify/:id',
    component:AirportComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(airport_routes)],
  exports: [RouterModule]
})

export class AirportRoutingModule { }
