import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  head2headId: number;
  head2head: Head2Head[];
  homeTeamLogo: string;
  awayTeamLogo: string;

  constructor(
    private route: ActivatedRoute,
    private footdata: FootdataService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    this.getRouteParamID();
    // this.getHead2Head();
    // this.getHead2HeadAndTeamInfo();
    this.getHead2HeadAndTeamInfo();
  }

  /**
   * Subscribes an observable and sets the head2headId based on Url
   *
   * @memberof Head2headComponent
   */
  getRouteParamID(): void {
    this.route.params.subscribe(params => {
      // console.log(params); //log the entire params object
      // console.log(params['id']); // log the value of id

      this.head2headId = params['id'];
    }, (err: any) => console.log(err));
  }

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
        // console.log('finished getHead2Head()');
      });
  }

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
