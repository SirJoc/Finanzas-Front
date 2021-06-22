import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from "./pages/home/home.component";
import {LetraComponent} from "./pages/letra/letra.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'students/new', component: LetraComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
