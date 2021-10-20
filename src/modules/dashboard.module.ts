import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from './shared.module'

@NgModule({
  declarations:[],
  imports:[
    SharedModule,
    CommonModule
  ],
  exports:[
    CommonModule
  ]
})

export class DashboardModule { }
