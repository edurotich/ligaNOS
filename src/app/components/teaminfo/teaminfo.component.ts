import { Component, OnInit } from '@angular/core';
import { FootdataService } from '../../services/footdata.service';
import { TeamPlayers } from './teamplayers.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teaminfo',
  templateUrl: './teaminfo.component.html',
  styleUrls: ['./teaminfo.component.css']
})
export class TeaminfoComponent implements OnInit {

  teamPlayers: TeamPlayers;
  teamId: number;

  constructor(private route: ActivatedRoute, private footdata: FootdataService) { }

  ngOnInit() {
    this.getRouteParamID();
    this.getTeamPlayers();
  }

  getRouteParamID(): void {
    this.route.params.subscribe(params => {
      // console.log(params); //log the entire params object
      // console.log(params['id']); // log the value of id

      this.teamId = params['id'];
    }, (err: any) => console.log(err));
  }

  getTeamPlayers(): void {
    this.footdata.getTeamPlayers(this.teamId).subscribe(
      (data: any) => {
        this.teamPlayers = data;
        console.log(data);
      }, (err: any) => console.log(err),
      () => {
        console.log('finished getAllLeagueTeams()');
      }
    );
  }

}
