import { Component, OnInit } from '@angular/core';
import { Matches } from './matches.interface';
import { DatePipe } from '@angular/common';
import { FootdataService } from '../../services/footdata.service';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  currentMatchday: number;
  numberOfMatchdays: number;
  matches: Matches[];

  constructor(private footdata: FootdataService) {
  }

  ngOnInit() {
    this.getLeagueInfoAndMatches();

    // Another approach
    // this.getLeagueInfoAndMatches2();
  }

  /**
   * Subscribes two observables from footdata service in order by using flatMap.
   * Because getMatches is dependent from getLeagueInfo it will only make second
   * request when first has finished
   *
   * @memberof HomeComponent
   */
  getLeagueInfoAndMatches() {
    this.footdata.getLeagueInfo().flatMap(data => {
      this.currentMatchday = data.currentMatchday;
      this.numberOfMatchdays = data.numberOfMatchdays;

      return this.footdata.getMatches(this.currentMatchday);
    }).subscribe(data => {
      this.matches = data;
    });
  }

  /**
   * This approach only uses the subscribe method.
   * Calls the second observable(getMatches) when getLeagueInfo is complete.
   *
   * @memberof HomeComponent
   */
  getLeagueInfoAndMatches2() {
    this.footdata.getLeagueInfo().subscribe(
      data => {
        this.currentMatchday = data.currentMatchday;
        this.numberOfMatchdays = data.numberOfMatchdays;
      }, (err: any) => console.log(err),
      () => {
        console.log('finished getLeagueInfo');
        this.footdata.getMatches(this.currentMatchday).subscribe(
          data => {
            console.log(data);
            this.matches = data;
          }, (err: any) => console.log(err),
          () => { console.log('finished getAllMatches'); }
        );
      }
    );
  }

  /**
   * Creates a range from 1 to numberOfMatchdays that pushes
   * the index to the array so it can be used inside *ngFor
   *
   * @returns array of items
   * @memberof HomeComponent
   */
  createRange() {
    const items = [];
    for (let i = 1; i <= this.numberOfMatchdays; i++) {
      items.push(i);
    }
    return items;
  }

}
