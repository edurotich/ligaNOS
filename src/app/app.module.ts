import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TeamComponent } from './components/team/team.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LeaguetableComponent } from './components/leaguetable/leaguetable.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { FootdataService } from './services/footdata.service';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'team/:id', component: TeamComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'leaguetable', component: LeaguetableComponent},
  {path: 'calendar', component: CalendarComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TeamComponent,
    StatisticsComponent,
    LeaguetableComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [FootdataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
