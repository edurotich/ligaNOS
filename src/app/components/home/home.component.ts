import { Component, OnInit } from '@angular/core';
import { Matches } from './matches.interface';
import { DatePipe } from '@angular/common';
import { FootdataService } from '../../services/footdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  currentMatchday: number;
  numberOfMatchdays: number;
  matches: Matches[];

  constructor(private footdata: FootdataService) {
    // this.currentMatchday = 9;
  }

  ngOnInit() {
    this.getLeagueInfoAndMatches();
  }

  getLeagueInfoAndMatches() {
    this.footdata.getLeagueInfo().subscribe(
      data => {
        this.currentMatchday = data.currentMatchday;
        this.numberOfMatchdays = data.numberOfMatchdays;
      }, (err: any) => console.log(err),
      () => {
        console.log('finished getLeagueInfo');
        this.getMatches(this.currentMatchday); // calls getAllMatches when finished
      }
    );
  }

  getMatches(matchday: number) {
    this.footdata.getMatches(matchday).subscribe(
      d => {
        console.log(d);
        this.matches = d;
      }, (err: any) => console.log(err),
      () => { console.log('finished getAllMatches'); }
    );
  }

  createRange() {
    const items = [];
    for (let i = 1; i <= this.numberOfMatchdays; i++) {
      items.push(i);
    }
    return items;
  }

}
