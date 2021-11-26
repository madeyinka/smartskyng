import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from 'src/dashboard/admin/admin.component';
import { DashboardComponent } from 'src/dashboard/dashboard.component';
import { MainComponent } from 'src/frontend/main.component';
import { AboutComponent } from 'src/frontend/pages/about/about.component';
import { HomeComponent } from 'src/frontend/pages/home/home.component';
import { LoginComponent } from 'src/frontend/pages/login/login.component';
import { ProcessComponent } from 'src/frontend/pages/process/process.component';
import { RegisterComponent } from 'src/frontend/pages/register/register.component';
import { ServiceComponent } from 'src/frontend/pages/service/service.component';

const routes: Routes = [
  {path:'', redirectTo:'main', pathMatch:'full'},
  {
    path:'main',
    component:MainComponent,
    children:[
      {path:'', redirectTo:'index', pathMatch:'full'},
      {path:'index', component:HomeComponent},
      {path:'auth/login', component:LoginComponent},
      {path:'auth/register', component:RegisterComponent},
      {path:'services', component:ServiceComponent},
      {path:'about', component:AboutComponent},
      {path:'how-it-works', component:ProcessComponent},
      {path:'booking', loadChildren: () => import('./../modules/booking.module').then(m => m.BookingModule)}
    ]
  },
  {
    path:'user',
    component:DashboardComponent,
    children:[
      {path:'',
      loadChildren: () => import('./../modules/user.module').then(m => m.UserModule)}
    ]
  },
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./../modules/admin.module').then(m => m.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
