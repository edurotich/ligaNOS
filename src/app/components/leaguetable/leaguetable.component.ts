import { Component, OnInit } from '@angular/core';
import { FootdataService } from '../../services/footdata.service';
import { LeagueTable } from './leaguetable.interface';
import { Matches } from '../home/matches.interface';

@Component({
  selector: 'app-leaguetable',
  templateUrl: './leaguetable.component.html',
  styleUrls: ['./leaguetable.component.css']
})
export class LeaguetableComponent implements OnInit {

  leagueTables: LeagueTable[];
  previousLeagueTable: LeagueTable[];
  matches: Matches[];
  firstMatchDate: Date;
  isHome = false;
  isAway = false;

  constructor(private footdata: FootdataService) { }

  ngOnInit() {
    this.getCurrentAndPreviousLeagueTable();
  }

  getCurrentAndPreviousLeagueTable(): void {
    this.footdata.getLeagueTable().flatMap((data: any) => {
      this.leagueTables = data;

      return this.footdata.getMatches(parseInt(this.leagueTables['matchday'], 10));
    }).flatMap((data: any) => {
      this.matches = data;

      this.firstMatchDate = this.getFirstMatchDate(data.fixtures);
      const todayDate = new Date();

      if (this.firstMatchDate > todayDate) {
        return this.footdata.getPreviousLeagueTable(this.leagueTables['matchday'] - 2);
      } else {
        return this.footdata.getPreviousLeagueTable(this.leagueTables['matchday'] - 1);
      }

    }).flatMap((data: any) => {
      this.previousLeagueTable = data;

      return this.footdata.getPreviousLeagueTable(this.leagueTables['matchday'] - 1);
    }).subscribe((data: any) => {

      const todayDate = new Date();

      if (this.firstMatchDate > todayDate) {
        this.leagueTables = data;
      }
    }, (err: any) => console.log(err),
      () => {
        // console.log('finished getCurrentAndPreviousLeagueTable()');
      });
  }



  /**
  * Loops through data and counts the total of goals
  *
  * @param {any[]} data
  * @returns {number}
  * @memberof HomeComponent
  */
  getTotalScoredGoals(data: any[]): number {
    let total = 0;
    data.forEach((d) => {
      total += parseInt(d.goals, 10);
    });
    // console.log(total);
    return total;
  }

  getTeamMostWins(data: any[]): string {
    let max = 0, team;
    data.forEach((d) => {
      if (d.wins > max) {
        max = d.wins;
        team = d.teamName;
      }
    });
    return team;
  }

  getTeamMostDraws(data: any[]): string {
    let max = 0, team;
    data.forEach((d) => {
      if (d.draws > max) {
        max = d.draws;
        team = d.teamName;
      }
    });
    return team;
  }

  getTeamMostLosses(data: any[]): string {
    let max = 0, team;
    data.forEach((d) => {
      if (d.losses > max) {
        max = d.losses;
        team = d.teamName;
      }
    });
    return team;
  }

  getTeamMostScoredGoals(data: any[]): string {
    let max = 0, team;
    data.forEach((d) => {
      if (d.goalDifference > max) {
        max = d.goalDifference;
        team = d.teamName;
      }
    });
    return team;
  }

  getTeamMostConcededGoals(data: any[]): string {
    let min = 0, team;
    data.forEach((d) => {
      if (d.goalDifference < min) {
        min = d.goalDifference;
        team = d.teamName;
      }
    });
    return team;
  }

  getTeamMostScoredGoalsHome(data: any[]): string {
    let max = 0, team;
    data.forEach((d) => {
      if (d.home.goals >= max) {
        max = d.home.goals;
        team = d.teamName;
      }
    });
    return team;
  }

  getTeamMostConcededGoalsHome(data: any[]): string {
    let max = 0, team;
    data.forEach((d) => {
      if (d.home.goalsAgainst >= max) {
        max = d.home.goalsAgainst;
        team = d.teamName;
      }
    });
    return team;
  }

  getTeamMostScoredGoalsAway(data: any[]): string {
    let max = 0, team;
    data.forEach((d) => {
      if (d.away.goals >= max) {
        max = d.away.goals;
        team = d.teamName;
      }
    });
    return team;
  }

  getTeamMostConcededGoalsAway(data: any[]): string {
    let max = 0, team;
    data.forEach((d) => {
      if (d.away.goalsAgainst >= max) {
        max = d.away.goalsAgainst;
        team = d.teamName;
      }
    });
    return team;
  }

  toggleHome(): void {
    this.isHome = !this.isHome;
  }

  toggleAway(): void {
    this.isAway = !this.isAway;
  }

  getTeamProgress(data: any[], teamName: string, dataprev: any[]): number {
    let currpos = 0;
    let prevpos = 0;

    data.forEach((d) => {
      if (d.teamName === teamName) {
        currpos = d.position;
      }
    });

    dataprev.forEach((d) => {
      if (d.teamName === teamName) {
        prevpos = d.position;
      }
    });

    if (prevpos > currpos) {
      return 1;
    } else {
      return 0;
    }
  }

  getFirstMatchDate(data: any[]): Date {
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        return new Date(data[i].date);
      }
    }
  }

}

/**
 * Interface could also be set in this component file
 * instead it was created a new leaguetable.interface.ts
 * file and the interface was set there
 *
 * @interface LeagueTable
 */
/*
interface LeagueTable {
  (...)
}
*/
