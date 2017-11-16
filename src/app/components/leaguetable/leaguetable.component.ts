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

  /**
   * Get the current and previous tables of the league.
   * 1st - Subscribes current league table and after that subscribes current journey matches.
   * 2nd - Gets the Date of the first match. 1stMatchDate > todayDate ? leagueTable - 2 : leagueTable - 1
   * 3rd - Subscribes previousLeagueTable based on the returned table
   * 4rd - Subscribes again previousLeaguetable -1. The goal is to update current table if 1stMatchDate > todayDate.
   * @memberof LeaguetableComponent
   */
  getCurrentAndPreviousLeagueTable(): void {
    this.footdata.getLeagueTable().flatMap((data: any) => {
      this.leagueTables = data;

      return this.footdata.getMatches(this.leagueTables['matchday']);
    }).flatMap((data: any) => {
      this.matches = data;

      this.firstMatchDate = this.getFirstMatchDate(data.fixtures);
      const todayDate = new Date();

      if (this.firstMatchDate > todayDate) { // needed when there are no matches played yet on current journey.
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
  * Loops through data and counts the total of goals.
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
    return total;
  }
  /**
   * Loops through data and counts the team with most wins.
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Loops through data and counts the team with most draws.
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Loops through data and counts the team with most losses.
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Loops through data and counts the team with most scored goals
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Loops through data and counts the team with most conceded goals
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Loops through data and counts the team with most scored goals at home
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Loops through data and counts the team with most conceded goals at Home
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Loops through data and counts the team with most scored goals Away
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Loops through data and counts the team with most conceded goals away
   *
   * @param {any[]} data
   * @returns {string}
   * @memberof LeaguetableComponent
   */
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
  /**
   * Hide and display home match stats
   *
   * @memberof LeaguetableComponent
   */
  toggleHome(): void {
    this.isHome = !this.isHome;
  }
  /**
   * Hide and display away match stats
   *
   * @memberof LeaguetableComponent
   */
  toggleAway(): void {
    this.isAway = !this.isAway;
  }
  /**
   * Compares team previous league table standing position with the current.
   *
   * @param {any[]} data - current league table data
   * @param {string} teamName - name of the team to search
   * @param {any[]} dataprev - previous league table data
   * @returns {number}  0 - team standing position is worst | 1 - team standing position improved
   * @memberof LeaguetableComponent
   */
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

  /**
   * Get the first match date of the current league journey
   *
   * @param {any[]} data
   * @returns {Date}
   * @memberof LeaguetableComponent
   */
  getFirstMatchDate(data: any[]): Date {
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        return new Date(data[i].date);
      }
    }
  }

}
