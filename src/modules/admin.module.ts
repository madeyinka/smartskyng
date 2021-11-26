import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from './shared.module'
import { AdminRoutingModule } from './../routes/admin.route'
import { DashboardComponent } from 'src/dashboard/admin/pages/dashboard/dashboard.component'
import { AirportComponent } from '../dashboard/admin/pages/airport/airport.component'
import { AirportListComponent } from '../dashboard/admin/pages/airport-list/airport-list.component'
import { DropOffComponent } from '../dashboard/admin/pages/drop-off/drop-off.component'

@NgModule({
  declarations:[
    DashboardComponent,
    AirportComponent,
    AirportListComponent,
    DropOffComponent
  ],
  imports:[
    SharedModule,
    CommonModule,
    AdminRoutingModule
  ],
  exports:[
    CommonModule
  ]
})

export class AdminModule { }
