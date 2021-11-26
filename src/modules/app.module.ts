//angular core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modules
import { AppRoutingModule } from '../routes/app-routing.module';
import { SharedModule } from './shared.module'
import { MainModule } from './main.module'
import { DashboardModule } from './dashboard.module'
import { AdminModule } from './admin.module'

//Services
import { HttpService } from './../services/http.service'
import { TokenInterceptorService } from '../services/token-interceptor.service'

//components
import { AppComponent } from './../app/app.component';
import { MainComponent } from '../frontend/main.component'
import { HeaderComponent } from '../frontend/partials/header/header.component'
import { FooterComponent } from '../frontend/partials/footer/footer.component'
import { LoginComponent } from '../frontend/pages/login/login.component'
import { RegisterComponent } from '../frontend/pages/register/register.component'
import { UserComponent } from '../frontend/pages/register/user/user.component'
import { CompanyComponent } from '../frontend/pages/register/company/company.component'
import { AgentComponent } from '../frontend/pages/register/agent/agent.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { DashHeaderComponent } from '../dashboard/partials/dash-header/dash-header.component'
import { DashNavComponent } from '../dashboard/partials/dash-nav/dash-nav.component'
import { DashFooterComponent } from '../dashboard/partials/dash-footer/dash-footer.component'
import { AdminComponent } from '../dashboard/admin/admin.component'
import { AdminHeaderComponent } from '../dashboard/admin/partials/admin-header/admin-header.component'
import { AdminNavComponent } from '../dashboard/admin/partials/admin-nav/admin-nav.component'
import { AdminFooterComponent } from '../dashboard/admin/partials/admin-footer/admin-footer.component'


@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    CompanyComponent,
    AgentComponent,
    DashboardComponent,
    DashHeaderComponent,
    DashNavComponent,
    DashFooterComponent,
    AdminHeaderComponent,
    AdminNavComponent,
    AdminFooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    MainModule,
    DashboardModule,
    AdminModule
  ],
  providers: [HttpService, {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
