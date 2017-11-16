import { Component, OnInit } from '@angular/core';
import { FootdataService } from '../../services/footdata.service';
import { Teams } from './teams.interface';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Teams[];

  constructor(private footdata: FootdataService, private helper: HelperService) { }

  ngOnInit() {
    this.getAllLeagueTeams();
  }

  /**
   * Subscribes an observable returned from service and sets the teams
   *
   * @memberof TeamComponent
   */
  getAllLeagueTeams(): void {
    this.footdata.getAllLeagueTeams().subscribe(
      (data: any) => {
        this.teams = data;
      }, (err: any) => console.log(err),
      () => {
        // console.log('finished getMatches()');
      }
    );
  }

  /**
   * Sends a link to the helper service and returns occurrence between slashes
   *
   * @param {string} link
   * @returns {number}
   * @memberof TeamComponent
   */
  getOccurrenceBetweenSlash(link: string): number {
    return this.helper.getOccurrenceBetweenSlash(link);
  }

}
