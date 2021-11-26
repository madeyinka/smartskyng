import { NgModule } from '@angular/core'
import { PaymentRoutingModule } from './../routes/payment.route'
import { SharedModule } from './shared.module'

@NgModule({
  declarations:[
  ],
  imports:[
    SharedModule,
    PaymentRoutingModule
  ]
})

export class PaymentModule { }
