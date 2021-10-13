//angular core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//modules
import { AppRoutingModule } from '../routes/app-routing.module';
import { SharedModule } from './shared.module'
import { MainModule } from './main.module'

//Services
import { HttpService } from './../services/http.service'

//components
import { AppComponent } from './../app/app.component';
import { MainComponent } from '../frontend/main.component'
import { HeaderComponent } from '../frontend/partials/header/header.component'
import { FooterComponent } from '../frontend/partials/footer/footer.component'


@NgModule({
  declarations: [
    AppComponent,
     MainComponent,
     HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MainModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
