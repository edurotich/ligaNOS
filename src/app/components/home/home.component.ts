import { Component, OnInit } from '@angular/core';
import { Matches } from './matches.interface';
import { DatePipe } from '@angular/common';
import { FootdataService } from '../../services/footdata.service';
import { HelperService } from '../../services/helper.service';
import 'rxjs/add/operator/mergeMap'; // enables flatMap

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  matches: Matches;
  currentMatchday: number;
  changeCurrentMatchday = false;
  arrayOfMatchdays: number[];

  constructor(private footdata: FootdataService, private helper: HelperService) {
  }

  ngOnInit() {
    this.getLeagueInfoAndMatches();
    // this.getLeagueInfoAndMatches2();
  }

  /**
   * Subscribes 2 observables returned from service in order by using flatMap.
   * Matches subscription is dependent from leagueinfo subsc so will only start when 1st has finished.
   *
   * @memberof HomeComponent
   */
  getLeagueInfoAndMatches() {
    this.footdata.getLeagueInfo().flatMap((data: any) => {
      this.createRange(data.numberOfMatchdays);

      // If selected value from dropdown hasnt changed gets the current Matchday of the league
      if (this.changeCurrentMatchday === false) {
        this.currentMatchday = data.currentMatchday;
      }

      return this.footdata.getMatches(this.currentMatchday);
    }).subscribe((data: any) => {
      this.matches = data;
    }, (err: any) => console.log(err),
      () => {
        // console.log('finished getLeagueInfoAndMatches()');
      });
  }

  /**
   * Subscribes an observable returned from the service.
   * This method is only being called on change events.
   *
   * @param {any} matchday - the selected matchday
   * @memberof HomeComponent
   */
  getMatches(matchday): void {
    this.footdata.getMatches(matchday).subscribe(
      (data: Matches) => {
        this.matches = data;
      }, (err: any) => console.log(err),
      () => {
        // console.log('finished getMatches()');
      }
    );
  }

  /**
   * This second approach only uses the subscribe method.
   * @memberof HomeComponent
   */
  getLeagueInfoAndMatches2(): void {
    this.footdata.getLeagueInfo().subscribe(
      (data: any) => {
        this.currentMatchday = data.currentMatchday;
      }, (err: any) => console.log(err),
      () => {
        // console.log('finished getLeagueInfo');
        this.footdata.getMatches(this.currentMatchday).subscribe(
          (data: Matches) => {
            this.matches = data;
          }, (err: any) => console.log(err),
          () => {
            // console.log('finished getLeagueInfoAndMatches2()');
          }
        );
      }
    );
  }


  /**
   * Fills the arrayOfMatchdays from 0 to numberOfMatchdays by using ES6 sintax.
   *
   * @memberof HomeComponent
   */
  createRange(numberOfMatchdays: number): void {
    this.arrayOfMatchdays = Array(numberOfMatchdays + 1).fill(null, 1, numberOfMatchdays + 1).map((x, i) => i);
  }

  /**
   * This second approach returns a range of numbers to be used inside *ngFor.
   *
   * @returns {number[]} -  array of numbers from 1 to numberOfMatchdays
   * @memberof HomeComponent
   */
  createRange2(numberOfMatchdays: number): number[] {
    const items: number[] = [];
    for (let i = 1; i <= numberOfMatchdays; i++) {
      items.push(i);
    }
    return items;
  }

  /**
   * Handle (click) and ngModelChange events.
   *
   * @param {number} option 0 - change league match | 1 - previous league matches | 2 - next league matches
   * @param {any} matchday - value sent from the dropdown menu
   * @memberof HomeComponent
   */
  onChange(option: number, matchday: any): void {
    switch (option) {
      case 0:
        this.currentMatchday = parseInt(matchday, 10);
        break;
      case 1:
        if (this.currentMatchday - 1 > 0) {
          this.currentMatchday -= 1;
        }
        break;
      case 2:
        if (this.currentMatchday + 1 < this.arrayOfMatchdays.length) {
          this.currentMatchday += 1;
        }
        break;
    }

    this.changeCurrentMatchday = true;
    this.getMatches(this.currentMatchday);
  }

  /**
   * Sends a link to the helper service and returns the last occurrence after slash
   *
   * @param {string} link
   * @returns {string} gets a link and returns an id
   * @memberof HomeComponent
   */
  getLastOccurrence(link: string): number {
    return this.helper.getLastOccurrence(link);
  }

}
