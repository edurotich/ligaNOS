import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Head2Head } from './head2head.interface';
import { FootdataService } from '../../services/footdata.service';
import { HelperService } from '../../services/helper.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-head2head',
  templateUrl: './head2head.component.html',
  styleUrls: ['./head2head.component.css']
})
export class Head2headComponent implements OnInit {

  head2head: Head2Head[];
  head2headId: number;
  homeTeamLogo: string;
  awayTeamLogo: string;

  constructor(
    private route: ActivatedRoute,
    private footdata: FootdataService,
    private router: Router,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    this.getRouteParamID();
    this.getHead2HeadAndTeamInfo();
  }

  /**
   * Get ID from url and sets the head2headId to be used on getHead2HeadAndTeamInfo()
   *
   * @memberof Head2headComponent
   */
  getRouteParamID(): void {
    this.route.params.subscribe(params => {
      // console.log(params); // log the entire params object
      // console.log(params['id']); // log the value of id

      if (this.helper.hasOnlyNumbers(params['id'])) {
        this.head2headId = params['id'];
      } else {
        this.router.navigate(['/']); // redirect
      }
    }, (err: any) => console.log(err));
  }

  /**
   * Subscribes to 3 different observables to get Head2Head stats plus team logos.
   * getTeamInfo subscriptions will both run in parallel and are dependent from getHead2Head subscription
   *
   * @memberof Head2headComponent
   */
  getHead2HeadAndTeamInfo(): void {
    this.footdata.getHead2Head(this.head2headId).subscribe(
      data => {
        this.head2head = data;

        Observable.forkJoin(
          this.footdata.getTeamInfo(this.helper.getLastOccurrence(data.fixture._links.homeTeam.href)),
          this.footdata.getTeamInfo(this.helper.getLastOccurrence(data.fixture._links.awayTeam.href))
        ).subscribe((d: any[]) => {
          this.homeTeamLogo = d[0].crestUrl; // d[0] data for getTeamInfo( ... hometeamID)
          this.awayTeamLogo = d[1].crestUrl; // d[1] data for getTeamInfo( ... awayteamID)
        }, (err: any) => console.log(err),
          () => {
            // console.log('finished forkjoin');
          });

      }, (err: any) => console.log(err),
      () => {
        // console.log('finished getHead2HeadAndTeamInfo()');
      });
  }
  /**
   * Receives data from the html component, counts team goals and returns it back
   *
   * @param {any[]} data - data received on the html component.
   * @param {string} teamName - needed to distinguish when counting goals for each team.
   * @returns {number} - the total of goals
   * @memberof Head2headComponent
   */
  countTeamGoals(data: any[], teamName: string): number {
    let total = 0;
    data.forEach((d) => {
      if (teamName === d.homeTeamName) {
        total += parseInt(d.result.goalsHomeTeam, 10);
      } else if (teamName === d.awayTeamName) {
        total += parseInt(d.result.goalsAwayTeam, 10);
      }
    });
    return total;

  }


}
