import { Component, OnInit } from '@angular/core';
import { FootdataService } from '../../services/footdata.service';
import { LeagueTable } from './leaguetable.interface';

@Component({
  selector: 'app-leaguetable',
  templateUrl: './leaguetable.component.html',
  styleUrls: ['./leaguetable.component.css']
})
export class LeaguetableComponent implements OnInit {

  leagueTables: LeagueTable[];
  previousLeagueTable: LeagueTable[];
  currentMatchDay: number;
  isHome = false;
  isAway = false;

  constructor(private footdata: FootdataService) { }

  ngOnInit() {
    this.getCurrentAndPreviousLeagueTable();
  }

  getCurrentAndPreviousLeagueTable(): void {
    this.footdata.getLeagueTable().flatMap((data: any) => {
      this.leagueTables = data;
      this.currentMatchDay = data.matchday;

      return this.footdata.getPreviousLeagueTable(this.currentMatchDay - 1);
    }).subscribe((data: any) => {

      this.previousLeagueTable = data;
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
  getTotalGoals(data: any[]): number {
    if (data) {
      let total = 0;
      data.forEach((d) => {
        total += parseInt(d.goals, 10);
      });
      return total;
    }
  }

  toggleHome(): void {
    this.isHome = !this.isHome;
  }

  toggleAway(): void {
    this.isAway = !this.isAway;
  }

  getTeamProgress(data: any, teamName: string, dataprev: any): number {
    let currpos = 0;
    let prevpos = 0;

    data.forEach((d) => {
      if (d.teamName === teamName) {
        currpos = d.position;
      }
    });
    // console.log(currpos);

    dataprev.forEach((d) => {
      if (d.teamName === teamName) {
        prevpos = d.position;
      }
    });
    // console.log(prevpos);

    if (prevpos > currpos) {
      return 1;
    }else {
      return 0;
    }

    /*
    Object.keys(dataprev).forEach((d, i) => {
      if (dataprev[i].teamName === teamName) {
        prevpos = dataprev[i].position;
      }
    });

    console.log(prevpos);

    */

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
