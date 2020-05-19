import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { UserformComponent } from './userform/userform.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "countries", component: CountriesComponent},
  {path: "about", component: AboutComponent},
  {path: "register", component: RegisterComponent},
  {path: "userform", component: UserformComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' } //To set auto route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
