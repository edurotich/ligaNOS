import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TeamComponent } from './components/team/team.component';

import { FootdataService } from './services/footdata.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'team', component: TeamComponent},
];

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, HomeComponent, TeamComponent
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
