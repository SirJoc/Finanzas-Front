import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FindusComponent } from './pages/findus/findus.component';
import { AboutComponent } from './pages/about/about.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "./app-routing.module";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import { LetraComponent } from './pages/letra/letra.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { MainNavComponent } from './pages/main-nav/main-nav.component';
import {DatePipe} from "@angular/common";
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FindusComponent,
    AboutComponent,
    LetraComponent,
    MainNavComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        MatTooltipModule,
        MatSelectModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatListModule,
        MatNativeDateModule,
        RouterModule,
        MatSidenavModule,
        FlexLayoutModule
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
