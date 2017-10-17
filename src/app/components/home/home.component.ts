import { Component, OnInit } from '@angular/core';
import { FootdataService } from '../../services/footdata.service';
import { LeagueTable } from './leaguetable.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  leagueTables: LeagueTable[];

  constructor(private footdata: FootdataService) {
  }

  ngOnInit() {
    this.footdata.getLeagueTable().subscribe((data) => {
      console.log(data);
      this.leagueTables = data;
    });
  }
}
/*
interface LeagueTable {
  links: {
    self: {
      href: string;
    },
    competition: {
      href: string;
    }
  };
  leagueCaption: string;
  matchday: number;
  standing: [
  {
    links: {
      team: {
        href: string;
      }
    },
    position: number;
    teamName: string;
    crestURI: string;
    playedGames: number;
    points: number;
    goals: number;
    goalsAgainst: number;
    goalDifference: number;
    wins: number;
    draws: number;
    losses: number;
    home: {
      goals: number;
      goalsAgainst: number;
      wins: number;
      draws: number;
      losses: number;
    },
    away: {
      goals: number;
      goalsAgainst: number;
      wins: number;
      draws: number;
      losses: number;
    }
  }];
}
*/
