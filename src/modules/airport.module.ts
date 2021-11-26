import { NgModule } from '@angular/core'
import { AirportRoutingModule } from './../routes/airport.route'
import { SharedModule } from './shared.module'

@NgModule({
  declarations:[
  ],
  imports:[
    SharedModule,
    AirportRoutingModule
  ]
})

export class AirportModule { }
