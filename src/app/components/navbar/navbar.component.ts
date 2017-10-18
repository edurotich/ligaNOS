import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() leagueTables: string;
  constructor() { }

  ngOnInit() {
  }

  /**
   * Extracts the team id from team Link after last occurence of slash
   * This avoids fetching team leagues ids due to low free available api requests.
   * @param {string} teamLink
   * @returns
   * @memberof NavbarComponent
   */
  removeChars(teamLink: string) {
    return teamLink.substring(teamLink.lastIndexOf('/') + 1);
  }

}
