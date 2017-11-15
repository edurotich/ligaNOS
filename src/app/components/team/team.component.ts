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

  getAllLeagueTeams(): void {
    this.footdata.getAllLeagueTeams().subscribe(
      (data: any) => {
        this.teams = data;
        console.log(data);
      }, (err: any) => console.log(err),
      () => {
        console.log('finished getMatches()');
      }
    );
  }

  getOccurrenceBetweenSlash(link: string): number {
    return this.helper.getOccurrenceBetweenSlash(link);
  }

}
