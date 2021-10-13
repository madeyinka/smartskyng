import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MainComponent } from 'src/frontend/main.component';
import { AboutComponent } from 'src/frontend/pages/about/about.component';
import { HomeComponent } from 'src/frontend/pages/home/home.component';
import { ProcessComponent } from 'src/frontend/pages/process/process.component';
import { ServiceComponent } from 'src/frontend/pages/service/service.component';

const routes: Routes = [
  {path:'', redirectTo:'main', pathMatch:'full'},
  {
    path:'main',
    component:MainComponent,
    children:[
      {path:'', redirectTo:'index', pathMatch:'full'},
      {path:'index', component:HomeComponent},
      {path:'services', component:ServiceComponent},
      {path:'about', component:AboutComponent},
      {path:'how-it-works', component:ProcessComponent},
      {path:'booking', loadChildren: () => import('./../modules/booking.module').then(m => m.BookingModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
