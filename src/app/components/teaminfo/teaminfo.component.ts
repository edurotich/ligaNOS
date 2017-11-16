import { Component, OnInit } from '@angular/core';
import { FootdataService } from '../../services/footdata.service';
import { TeamPlayers } from './teamplayers.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-teaminfo',
  templateUrl: './teaminfo.component.html',
  styleUrls: ['./teaminfo.component.css']
})
export class TeaminfoComponent implements OnInit {

  teamPlayers: TeamPlayers;
  teamId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
    private footdata: FootdataService
  ) { }

  ngOnInit() {
    this.getRouteParamID();
    this.getTeamPlayers();
  }
  /**
   * Get ID from url and set it to teamId to be used on getTeamPlayers
   *
   * @memberof TeaminfoComponent
   */
  getRouteParamID(): void {
    this.route.params.subscribe(params => {
      if (this.helper.hasOnlyNumbers(params['id'])) {
        this.teamId = params['id'];
      } else {
        this.router.navigate(['teams']); // redirect
      }
    }, (err: any) => console.log(err));
  }
  /**
   * Subscribes an observable returned from the service and sets teamPlayers
   *
   * @memberof TeaminfoComponent
   */
  getTeamPlayers(): void {
    this.footdata.getTeamPlayers(this.teamId).subscribe(
      (data: any) => {
        this.teamPlayers = data;
      }, (err: any) => console.log(err),
      () => {
        // console.log('finished getTeamPlayers()');
      }
    );
  }

}
