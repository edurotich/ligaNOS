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
  homeTeamId: number;
  awayTeamId: number;

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

  getHead2HeadAndTeamInfo() {
    this.footdata.getHead2Head(this.head2headId).subscribe(
      data => {
        this.head2head = data;
        this.homeTeamId = this.helper.getLastOccurrence(data.fixture._links.homeTeam.href);
        this.awayTeamId = this.helper.getLastOccurrence(data.fixture._links.awayTeam.href);

        Observable.forkJoin(
          this.footdata.getTeamInfo(this.homeTeamId),
          this.footdata.getTeamInfo(this.awayTeamId)
        ).subscribe((d: any[]) => {
          this.homeTeamLogo = d[0].crestUrl; // d[0] data for getTeamInfo(this.homeTeamId)
          this.awayTeamLogo = d[1].crestUrl; // d[1] data for getTeamInfo(this.awayTeamId)
        }, (err: any) => console.log(err),
          () => {
            // console.log('finished forkjoin');
          });

      }, (err: any) => console.log(err),
      () => {
        // console.log('finished getHead2Head()');
      });
  }

  /*
  getHead2HeadAndTeamInfo2() {
    this.footdata.getHead2Head(this.head2headId).flatMap((data: any) => {
      this.head2head = data;
      this.homeTeamId = this.helper.getLastOccurrence(data.fixture._links.homeTeam.href);
      this.awayTeamId = this.helper.getLastOccurrence(data.fixture._links.awayTeam.href);

      return this.footdata.getTeamInfo(this.homeTeamId);
    }).flatMap((data: any) => {
      this.homeTeamLogo = data.crestUrl;

      return this.footdata.getTeamInfo(this.awayTeamId);
    }).subscribe((data: any) => {
      this.awayTeamLogo = data.crestUrl;
    });
  }*/

}
