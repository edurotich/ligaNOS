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

  getTotalGoals(data) {
    if (data) {
      let total = 0;
      data.forEach((d) => {
          total += parseInt(d.goals, 10); // get the correct property and pass it to integer
      });
      return total;
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
