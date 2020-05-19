import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { AboutComponent } from './about/about.component'; 
import { GovIndiaCityService } from './services/apicallservices/gov-india-city.service';
import { RegisterService } from './services/employee/register.service';
import { RegisterComponent } from './register/register.component';
import { CovidserviceService } from './services/apicallservices/india/covidservice.service';
import { ReversepipePipe } from './pipes/reversepipe.pipe';
import { UserformComponent } from './userform/userform.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesComponent,
    AboutComponent,
    RegisterComponent,
    ReversepipePipe,
    UserformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GovIndiaCityService, RegisterService, CovidserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
