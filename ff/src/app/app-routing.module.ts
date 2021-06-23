import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from "./pages/home/home.component";
import {LetraComponent} from "./pages/letra/letra.component";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  { path: 'letras', component: HomeComponent},
  { path: 'letras/new', component: LetraComponent},
  { path: '', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
