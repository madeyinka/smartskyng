import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './../frontend/pages/home/home.component'

const main_routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(main_routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
