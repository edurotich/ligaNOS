import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { FootdataService } from './services/footdata.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [FootdataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
