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
  isHome = false;
  isAway = false;

  constructor(private footdata: FootdataService) { }

  ngOnInit() {
    this.getLeagueTable();
  }

  /**
   * Subscribes observable returned from service
   *
   * @memberof LeaguetableComponent
   */
  getLeagueTable(): void {
    this.footdata.getLeagueTable().subscribe((data) => {
      console.log(data);
      this.leagueTables = data;
    });
  }

  /**
  * Loops through data and counts the total of goals
  *
  * @param {any} data
  * @returns {number}
  * @memberof HomeComponent
  */
  getTotalGoals(data: any): number {
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
