import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from './shared.module'
import { MainRoutingModule } from './../routes/main.route'
import {HomeComponent} from './../frontend/pages/home/home.component'
import {ServiceComponent} from './../frontend/pages/service/service.component'
import {AboutComponent} from './../frontend/pages/about/about.component'
import {ProcessComponent} from './../frontend/pages/process/process.component'


@NgModule({
  declarations: [
    HomeComponent,
    ServiceComponent,
    AboutComponent,
    ProcessComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MainRoutingModule
  ],
  exports: [
    CommonModule
  ]
})

export class MainModule { }
